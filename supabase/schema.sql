create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  name text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  price numeric(10, 2),
  deleted boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists availability (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  weekday integer not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  check (start_time < end_time)
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  service_id uuid not null references services (id),
  client_name text not null,
  start_at timestamp not null,
  end_at timestamp not null,
  status text not null default 'agendado' check (status in ('agendado', 'cancelado')),
  created_at timestamptz not null default now(),
  check (start_at < end_at)
);

create index if not exists services_user_id_idx on services (user_id);
create index if not exists availability_user_id_idx on availability (user_id);
create index if not exists appointments_user_id_idx on appointments (user_id);
create index if not exists appointments_start_at_idx on appointments (start_at);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table profiles enable row level security;
alter table services enable row level security;
alter table availability enable row level security;
alter table appointments enable row level security;

create policy "profiles_select_all"
  on profiles for select
  using (true);

create policy "profiles_update_own"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "services_select_active"
  on services for select
  using (deleted = false);

create policy "services_insert_own"
  on services for insert
  with check (auth.uid() = user_id);

create policy "services_update_own"
  on services for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "availability_select_all"
  on availability for select
  using (true);

create policy "availability_insert_own"
  on availability for insert
  with check (auth.uid() = user_id);

create policy "availability_delete_own"
  on availability for delete
  using (auth.uid() = user_id);

create policy "appointments_select_all"
  on appointments for select
  using (true);

create policy "appointments_insert_anyone"
  on appointments for insert
  with check (true);

create policy "appointments_update_own"
  on appointments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
