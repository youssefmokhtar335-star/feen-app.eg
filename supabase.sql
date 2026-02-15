-- Feen Production schema (Supabase)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null check (role in ('user','owner')),
  created_at timestamptz not null default now()
);

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  phone text,
  address text,
  description text,
  lat double precision not null,
  lng double precision not null,
  verified boolean not null default false,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  stars int not null check (stars between 1 and 5),
  text text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.places enable row level security;
alter table public.reviews enable row level security;

create policy "profiles_read" on public.profiles for select using (true);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create policy "places_read" on public.places for select using (true);
create policy "places_insert_auth" on public.places for insert with check (auth.uid() = owner_id);
create policy "places_update_owner" on public.places for update using (auth.uid() = owner_id);
create policy "places_delete_owner" on public.places for delete using (auth.uid() = owner_id);

create policy "reviews_read" on public.reviews for select using (true);
create policy "reviews_insert_auth" on public.reviews for insert with check (auth.uid() = user_id);
create policy "reviews_delete_own" on public.reviews for delete using (auth.uid() = user_id);
