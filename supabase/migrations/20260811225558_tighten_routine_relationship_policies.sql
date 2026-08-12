drop policy if exists "routines_insert" on public.routines;
create policy "routines_insert"
on public.routines
for insert
to authenticated
with check (
  private.can_manage_organization((select auth.uid()), organization_id)
  and (
    sector_id is null
    or exists (
      select 1
      from public.sectors as sector
      where sector.id = routines.sector_id
        and sector.organization_id = routines.organization_id
    )
  )
);

drop policy if exists "routines_update" on public.routines;
create policy "routines_update"
on public.routines
for update
to authenticated
using (private.can_manage_organization((select auth.uid()), organization_id))
with check (
  private.can_manage_organization((select auth.uid()), organization_id)
  and (
    sector_id is null
    or exists (
      select 1
      from public.sectors as sector
      where sector.id = routines.sector_id
        and sector.organization_id = routines.organization_id
    )
  )
);

drop policy if exists "sector_items_insert" on public.sector_items;
create policy "sector_items_insert"
on public.sector_items
for insert
to authenticated
with check (
  exists (
    select 1
    from public.routines as routine
    where routine.id = sector_items.routine_id
      and private.can_manage_organization((select auth.uid()), routine.organization_id)
  )
  and (
    subroutine_id is null
    or exists (
      select 1
      from public.subroutines as subroutine
      where subroutine.id = sector_items.subroutine_id
        and subroutine.routine_id = sector_items.routine_id
    )
  )
);

drop policy if exists "sector_items_update" on public.sector_items;
create policy "sector_items_update"
on public.sector_items
for update
to authenticated
using (
  exists (
    select 1
    from public.routines as routine
    where routine.id = sector_items.routine_id
      and private.can_manage_organization((select auth.uid()), routine.organization_id)
  )
)
with check (
  exists (
    select 1
    from public.routines as routine
    where routine.id = sector_items.routine_id
      and private.can_manage_organization((select auth.uid()), routine.organization_id)
  )
  and (
    subroutine_id is null
    or exists (
      select 1
      from public.subroutines as subroutine
      where subroutine.id = sector_items.subroutine_id
        and subroutine.routine_id = sector_items.routine_id
    )
  )
);
