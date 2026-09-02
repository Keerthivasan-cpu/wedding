-- Supabase Schema for Vijayalakshmi & Ranjith Raj Wedding RSVP & Blessings Wall

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attendee_count int not null default 1,
  attending boolean not null,
  side text not null check (side in ('groom', 'bride', 'mutual_friend')),
  message text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table rsvps enable row level security;

-- Policy to allow anyone to submit an RSVP
drop policy if exists "public insert" on rsvps;
create policy "public insert" on rsvps for insert with check (true);

-- Policy to allow anyone to read attending RSVPs with messages for the Blessings Wall
drop policy if exists "public read attending with message" on rsvps;
create policy "public read attending with message" on rsvps for select
  using (attending = true and message is not null and message <> '');
