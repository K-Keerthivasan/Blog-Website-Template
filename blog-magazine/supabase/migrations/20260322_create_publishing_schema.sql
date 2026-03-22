create extension if not exists pgcrypto;

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text not null,
  bio text not null,
  location text,
  avatar_url text,
  email text,
  socials jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.authors(id) on delete restrict,
  category_id uuid not null references public.categories(id) on delete restrict,
  slug text not null unique,
  title text not null,
  dek text not null,
  excerpt text not null,
  body_mdx text not null,
  cover_image_url text,
  published_at timestamptz not null default now(),
  updated_at timestamptz,
  is_featured boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.post_tags (
  post_id uuid not null references public.posts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists posts_author_id_idx on public.posts(author_id);
create index if not exists posts_category_id_idx on public.posts(category_id);
create index if not exists posts_published_at_idx on public.posts(published_at desc);
create index if not exists post_tags_tag_id_idx on public.post_tags(tag_id);
