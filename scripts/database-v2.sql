-- Enable pgcrypto for gen_random_uuid if not enabled
create extension if not exists "pgcrypto";

-- Contact submissions (existing)
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  subh_naam varchar(255) not null,
  vishay varchar(255) not null,
  phone_number varchar(20) not null,
  sandesh text not null,
  created_at timestamptz default now()
);

-- Event announcements (add pdf_path)
create table if not exists event_announcements (
  id uuid default gen_random_uuid() primary key,
  event_name varchar(255) not null,
  pdf_link text,
  pdf_path text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admissions table
create table if not exists admissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  mother_name text not null,
  father_name text not null,
  dob date not null,
  photo_path text not null,
  sthayi_pata text not null,
  wartaman_shiksha text not null,
  poorv_shiksha text not null,
  reason text not null,
  workshop text not null,
  created_at timestamptz default now()
);

-- RLS
alter table contact_submissions enable row level security;
alter table event_announcements enable row level security;
alter table admissions enable row level security;

-- DEMO POLICIES (Relaxed; tighten for production)
drop policy if exists "contact select" on contact_submissions;
drop policy if exists "contact insert" on contact_submissions;
create policy "contact select" on contact_submissions for select using (true);
create policy "contact insert" on contact_submissions for insert with check (true);

drop policy if exists "ann select" on event_announcements;
drop policy if exists "ann update" on event_announcements;
drop policy if exists "ann insert" on event_announcements;
create policy "ann select" on event_announcements for select using (true);
create policy "ann update" on event_announcements for update using (true);
create policy "ann insert" on event_announcements for insert with check (true);

drop policy if exists "adm select" on admissions;
drop policy if exists "adm insert" on admissions;
create policy "adm select" on admissions for select using (true);
create policy "adm insert" on admissions for insert with check (true);

-- STORAGE buckets
insert into storage.buckets (id, name, public) values ('admissions','admissions', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('announcements','announcements', true) on conflict (id) do nothing;

-- STORAGE policies
-- Everyone can read public buckets
drop policy if exists "read admissions" on storage.objects;
drop policy if exists "upload admissions" on storage.objects;
drop policy if exists "read announcements" on storage.objects;
drop policy if exists "upload announcements" on storage.objects;

create policy "read admissions" on storage.objects for select using (bucket_id = 'admissions');
create policy "upload admissions" on storage.objects for insert with check (bucket_id = 'admissions');

create policy "read announcements" on storage.objects for select using (bucket_id = 'announcements');
create policy "upload announcements" on storage.objects for insert with check (bucket_id = 'announcements');
