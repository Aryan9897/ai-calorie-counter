-- Add weight_unit preference to profiles.
-- Weight is stored normalised in kg; this column records the user's display preference.
alter table public.profiles
  add column if not exists weight_unit text not null default 'lb'
  check (weight_unit in ('kg', 'lb'));
