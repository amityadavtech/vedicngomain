-- v3: Allow DELETE on storage for required buckets so old files can be removed
-- NOTE: For demo only. Restrict in production.

-- Storage delete policies for 'announcements' and 'admissions' buckets
drop policy if exists "delete admissions" on storage.objects;
drop policy if exists "delete announcements" on storage.objects;

create policy "delete admissions" on storage.objects for delete using (bucket_id = 'admissions');
create policy "delete announcements" on storage.objects for delete using (bucket_id = 'announcements');

-- Optional: ensure event_announcements is editable publicly (demo)
-- Already had select/update/insert in v2; keep as is.
