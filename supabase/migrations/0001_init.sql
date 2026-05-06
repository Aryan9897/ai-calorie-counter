-- 0001_init.sql
-- Initial schema for AI Calorie Tracker.

-- ---------- profiles ----------
create table public.profiles (
  user_id          uuid        primary key references auth.users(id) on delete cascade,
  display_name     text        not null,
  age              int         not null check (age > 0 and age < 130),
  daily_calorie_goal int       not null check (daily_calorie_goal > 0),
  height           numeric     check (height is null or height > 0),
  weight           numeric     check (weight is null or weight > 0),
  activity_level   text        check (activity_level is null or activity_level in
                                 ('sedentary','lightly_active','moderately_active','very_active','extra_active')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ---------- foods ----------
create table public.foods (
  id                   uuid        primary key default gen_random_uuid(),
  user_id              uuid        not null references auth.users(id) on delete cascade,
  name                 text        not null,
  calories_per_serving numeric     not null check (calories_per_serving >= 0),
  icon                 text        not null default '🍽️',
  created_at           timestamptz not null default now()
);

-- ---------- meal_entries ----------
create table public.meal_entries (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  food_id    uuid        not null references public.foods(id) on delete cascade,
  servings   numeric     not null default 1 check (servings > 0),
  logged_on  date        not null default current_date,
  created_at timestamptz not null default now()
);

-- ---------- indexes ----------
create index meal_entries_user_day_idx on public.meal_entries (user_id, logged_on);
create index meal_entries_food_idx     on public.meal_entries (food_id);
create index foods_user_idx            on public.foods (user_id);

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- ---------- row level security ----------
alter table public.profiles    enable row level security;
alter table public.foods       enable row level security;
alter table public.meal_entries enable row level security;

create policy "profiles are self-accessible"
  on public.profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "foods are self-accessible"
  on public.foods for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "meal_entries are self-accessible"
  on public.meal_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
