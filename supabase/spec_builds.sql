-- Honor.gg — Spec Builds Migration
-- Run this in the Supabase SQL Editor after schema.sql

create table if not exists public.spec_builds (
  id           bigint primary key generated always as identity,
  spec_id      text not null,
  content_type text not null check (content_type in ('mythic_plus', 'raid', 'pvp')),
  build_name   text not null,
  build_description text,
  talent_import text,
  stat_priority jsonb not null default '[]',
  key_talents   jsonb not null default '[]',
  hero_talents  jsonb,
  gear_slots    jsonb not null default '[]',
  patch         text not null default '12.0.5',
  unique (spec_id, content_type)
);

alter table public.spec_builds enable row level security;

create policy "Public read access"
  on public.spec_builds for select
  using (true);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Fire Mage — Mythic+
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'fire_mage',
  'mythic_plus',
  'Combustion Build',
  'High burst AoE centered around Combustion windows. Exceptional for timing keys with big pull damage and strong target-capped cleave.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAA',
  '["Haste", "Critical Strike", "Intellect", "Mastery", "Versatility"]',
  '[
    {"name":"Combustion","description":"Core cooldown — align with trinkets every pull for maximum burst"},
    {"name":"Pyromaniac","description":"Reduces Combustion CD on Hot Streak procs — high priority talent"},
    {"name":"Kindling","description":"Further reduces Combustion cooldown via critical Fire spells"},
    {"name":"Flamestrike","description":"Primary AoE spell — use on 3+ targets instead of Pyroblast"},
    {"name":"Scorch","description":"Keep Improved Scorch debuff active on priority target at all times"}
  ]',
  '{"path":"Spellslinger","reason":"Superior burst AoE for M+ — Signature Spell dramatically amplifies Flamestrike windows on large packs","keyNodes":["Signature Spell","Spellfrost Teachings","Spellfire Spheres"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Mandatory — dramatically increases Hot Streak proc rate"},
    {"slot":"Trinket 1","item":"Spymasters Web","notes":"BiS — on-use syncs perfectly with Combustion windows"},
    {"slot":"Trinket 2","item":"Elven Mooncrystal","notes":"Strong passive Intellect stat stick"},
    {"slot":"Weapon","item":"Voidforged Staff","notes":"Best in slot — high Intellect + Haste secondary stats"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Fire Mage — Raid
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'fire_mage',
  'raid',
  'Sun King Build',
  'Sustained single-target build maximizing Sun King''s Blessing uptime. Consistent damage profile ideal for progression raiding.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAB',
  '["Critical Strike", "Haste", "Intellect", "Mastery", "Versatility"]',
  '[
    {"name":"Sun King''s Blessing","description":"Core raid talent — build Heating Up stacks between Combustions for enhanced windows"},
    {"name":"Living Bomb","description":"Spread via Flamestrike for passive multi-target on add-heavy fights"},
    {"name":"Meteor","description":"Powerful cooldown — use during hero/bloodlust for raid burst windows"},
    {"name":"Improved Scorch","description":"Maintain the damage debuff on priority target throughout the fight"},
    {"name":"Flame Accelerant","description":"Free Pyroblast proc when not casting — never let it cap"}
  ]',
  '{"path":"Frostfire","reason":"Better sustained single target for raid — Frostfire Bolt empowers damage between Combustion windows with consistent procs","keyNodes":["Frostfire Bolt","Severe Temperatures","Icy Propulsion"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Tier set proc aligns directly with Combustion windows"},
    {"slot":"Trinket 1","item":"Voidforged Shard","notes":"Best raid trinket — massive Intellect proc on cooldown"},
    {"slot":"Trinket 2","item":"Elven Mooncrystal","notes":"Strong passive Crit — synergizes with Sun King stacking"},
    {"slot":"Weapon","item":"Voidforged Staff","notes":"Highest item level weapon available from final boss"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Augmentation Evoker — Mythic+
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'augmentation_evoker',
  'mythic_plus',
  'Prescience Build',
  'Essential support spec — amplifies your two highest DPS players while contributing meaningful personal damage. Irreplaceable in any serious key.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAC',
  '["Mastery", "Versatility", "Haste", "Critical Strike", "Intellect"]',
  '[
    {"name":"Prescience","description":"Cast on CD — apply to your two highest DPS players at every pull start"},
    {"name":"Fate Mirror","description":"Core amplification talent — empowers all Prescience targets with damage copies"},
    {"name":"Breath of Eons","description":"Major cooldown — align with hero/bloodlust for multiplicative group gains"},
    {"name":"Spatial Paradox","description":"Allows Prescience targets to cast while moving — huge M+ value"},
    {"name":"Upheaval","description":"Strong personal damage filler — weave between support ability casts"}
  ]',
  '{"path":"Chronowarden","reason":"M+ standard — Temporal Burst provides consistent group damage amplification on a reliable cooldown","keyNodes":["Temporal Burst","Wingleader","Reverberations"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Core for Ebon Might uptime extension"},
    {"slot":"Trinket 1","item":"Voidforged Shard","notes":"Strong personal DPS contribution on cooldown"},
    {"slot":"Trinket 2","item":"Elven Mooncrystal","notes":"Mastery stat stick — directly increases all Aug buffs"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Augmentation Evoker — Raid
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'augmentation_evoker',
  'raid',
  'Ebon Might Build',
  'Must-have in every serious raid team. Ebon Might plus Breath of Eons amplifies your top DPS by 8-12% — worth more than a second DPS slot.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAD',
  '["Mastery", "Versatility", "Haste", "Critical Strike", "Intellect"]',
  '[
    {"name":"Ebon Might","description":"Core identity — always active on 4 targets, maintain 100% uptime throughout the fight"},
    {"name":"Breath of Eons","description":"Ultimate cooldown — use during hero/bloodlust for multiplicative gains on top DPS"},
    {"name":"Fate Mirror","description":"Amplifies Prescience targets with automatic damage copies — never skip this"},
    {"name":"Blistering Scales","description":"Apply to your main tank — strong physical damage reduction buff for progression"},
    {"name":"Tip the Scales","description":"Instant-cast emergency for rapid Prescience reapplication after deaths"}
  ]',
  '{"path":"Chronowarden","reason":"Raid standard — Temporal Burst maximizes Ebon Might extension during Breath of Eons for longer burst windows","keyNodes":["Temporal Burst","Wingleader","Golden Hour"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Directly increases Ebon Might uptime — mandatory"},
    {"slot":"Trinket 1","item":"Elven Mooncrystal","notes":"Strong passive Mastery — increases all Aug buff values"},
    {"slot":"Trinket 2","item":"Voidforged Shard","notes":"Personal DPS contribution between support windows"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Subtlety Rogue — Mythic+
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'subtlety_rogue',
  'mythic_plus',
  'Shadow Dance Build',
  'Highest single-target DPS in the game. Shroud of Concealment makes Subtlety mandatory in all high-level keys — no other spec provides this.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAE',
  '["Agility", "Haste", "Mastery", "Critical Strike", "Versatility"]',
  '[
    {"name":"Shadow Dance","description":"Core cooldown — spend charges efficiently to maintain The Rotten buff uptime"},
    {"name":"Flagellation","description":"Major DPS cooldown — always align with Shadow Dance for maximum damage"},
    {"name":"Echoing Reprimand","description":"Efficient combo point generator — weave into every finisher window"},
    {"name":"The Rotten","description":"Massive damage multiplier — active during Shadow Dance, never waste charges"},
    {"name":"Shuriken Tornado","description":"Primary AoE ability for trash packs — use before Blade Flurry on 3+ targets"}
  ]',
  '{"path":"Deathstalker","reason":"Best M+ choice — Darkest Night dramatically empowers Shadow Dance burst windows with stacking damage bonuses","keyNodes":["Darkest Night","Deathstalker Mark","Corrupt the Blood"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Mandatory — resets Shadow Dance charges on finishers"},
    {"slot":"Trinket 1","item":"Treacherous Transmitter","notes":"Simulates highest for Sub Rogue — on-use syncs with Dance windows"},
    {"slot":"Trinket 2","item":"Voidforged Shard","notes":"Strong passive Agility when not using second on-use"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Subtlety Rogue — PvP
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'subtlety_rogue',
  'pvp',
  'Shadow Arena Build',
  'Dominant in 2v2 and 3v3. Smoke Bomb and Shroud provide unmatched team utility. Best setup spec in the game for coordinated kill windows.',
  null,
  '["Agility", "Versatility", "Mastery", "Haste", "Critical Strike"]',
  '[
    {"name":"Smoke Bomb","description":"Team-saving defensive — drop on your healer during incoming CC chains"},
    {"name":"Shadow Dance","description":"Burst window — coordinate with your partner for setup into kill target"},
    {"name":"Kidney Shot","description":"Primary CC — extend with Cheap Shot into a full kill window"},
    {"name":"Shadowstrike","description":"Main filler — builds combo points efficiently while applying poison DoTs"},
    {"name":"Evasion","description":"Strong personal defensive — use proactively vs melee cleave teams"}
  ]',
  '{"path":"Deathstalker","reason":"PvP standard — Darkest Night empowers Shadow Dance kill windows with stacking damage that punishes opponents","keyNodes":["Darkest Night","Deathstalker Mark","Hunt Them Down"]}',
  '[
    {"slot":"Gear","item":"Conquest Season 2 Full Set","notes":"Full PvP gear is mandatory for resilience and PvP power"},
    {"slot":"Trinket 1","item":"Medallion of the Alliance/Horde","notes":"Essential CC break — never queue without this"},
    {"slot":"Weapon","item":"Gladiator Daggers","notes":"Conquest weapon — maximize Agility for kill pressure"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Discipline Priest — Mythic+
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'discipline_priest',
  'mythic_plus',
  'Atonement Build',
  'Best M+ healer this patch. Atonement passively heals the full group while dealing damage — zero downtime healing with exceptional throughput.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAF',
  '["Haste", "Mastery", "Critical Strike", "Intellect", "Versatility"]',
  '[
    {"name":"Atonement","description":"Core mechanic — always maintain on all 5 group members before pulls"},
    {"name":"Power Word: Radiance","description":"Efficient group Atonement applicator — use twice before big damage windows"},
    {"name":"Evangelism","description":"Major cooldown — extends all Atonements by 6 sec during dangerous phases"},
    {"name":"Rapture","description":"Emergency cooldown — spreads Power Word: Shield to all at zero cost"},
    {"name":"Shadow Covenant","description":"Damage and healing amplifier — powerful during sustained high-damage phases"}
  ]',
  '{"path":"Archon","reason":"M+ standard — Power Surge empowers healing during key damage windows with increased Atonement transfer","keyNodes":["Power Surge","Resonant Words","Shock Pulse"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Major Atonement healing increase — dramatically raises throughput"},
    {"slot":"Trinket 1","item":"Voidforged Shard","notes":"Intellect and personal DPS contribution between healing windows"},
    {"slot":"Trinket 2","item":"Elven Mooncrystal","notes":"Strong Haste proc — reduces GCD and increases Atonement frequency"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Havoc Demon Hunter — Mythic+
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'havoc_dh',
  'mythic_plus',
  'Momentum Build',
  'Exceptional sustained AoE with Eye Beam and Blade Dance. Strong mobility and group utility with interrupt, sigils, and Imprison.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAG',
  '["Agility", "Haste", "Critical Strike", "Mastery", "Versatility"]',
  '[
    {"name":"Eye Beam","description":"Core cooldown — generates Fury and deals massive AoE damage, resets Blade Dance"},
    {"name":"Blade Dance","description":"Primary filler — high cleave damage with strong proc rate for free casts"},
    {"name":"Momentum","description":"Keep uptime by weaving Fel Rush and Vengeful Retreat between abilities"},
    {"name":"Essence Break","description":"Use immediately before Blade Dance for a massive damage amplification window"},
    {"name":"The Hunt","description":"Strong gap-closer and single-target burst — use on priority kill targets"}
  ]',
  '{"path":"Aldrachi Reaver","reason":"Better for M+ — Reaver Mark empowers Eye Beam AoE burst on large trash packs with stacking damage","keyNodes":["Reaver Mark","Art of the Glaive","Wounded Quarry"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Critical for Essence Break cooldown reduction — do not skip"},
    {"slot":"Trinket 1","item":"Treacherous Transmitter","notes":"BiS for Havoc — on-use syncs perfectly with Eye Beam windows"},
    {"slot":"Trinket 2","item":"Voidforged Shard","notes":"Strong passive Agility when second on-use is not available"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Havoc Demon Hunter — PvP
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'havoc_dh',
  'pvp',
  'Burst Arena Build',
  'Dominant in 2v2 and 3v3. Unmatched mobility and burst damage with Metamorphosis. Darkness provides a team-wide defensive when coordinated well.',
  null,
  '["Agility", "Versatility", "Haste", "Mastery", "Critical Strike"]',
  '[
    {"name":"Metamorphosis","description":"Primary burst cooldown — coordinate with partner stuns for kill windows"},
    {"name":"Blur","description":"Strong personal defensive — use proactively versus physical kill attempts"},
    {"name":"Darkness","description":"Party-wide defensive — save exclusively for when your healer is CC chained"},
    {"name":"Imprison","description":"CC utility — vital for controlling pets or locking out a third-party target"},
    {"name":"Eye Beam","description":"Stun plus damage during Meta windows — use to lock healer in critical moments"}
  ]',
  '{"path":"Fel-Scarred","reason":"PvP standard — Student of Suffering increases survivability while maintaining kill pressure during Meta windows","keyNodes":["Student of Suffering","Focused Hatred","Demonic Intensity"]}',
  '[
    {"slot":"Gear","item":"Conquest Season 2 Full Set","notes":"Full PvP gear mandatory — resilience and PvP power are essential"},
    {"slot":"Trinket 1","item":"Medallion of the Alliance/Horde","notes":"Essential CC break — non-negotiable in arena"},
    {"slot":"Weapon","item":"Gladiator Warglaives","notes":"Conquest weapon — maximize Agility for kill pressure"}
  ]'
) on conflict (spec_id, content_type) do nothing;

-- Windwalker Monk — Mythic+
insert into public.spec_builds (spec_id, content_type, build_name, build_description, talent_import, stat_priority, key_talents, hero_talents, gear_slots) values (
  'windwalker_monk',
  'mythic_plus',
  'Serenity Build',
  'Excellent burst AoE with Serenity and Strike of the Windlord. Ring of Peace provides unique group utility no other melee can replicate.',
  'BYQAAAAAAAAAAAAAAAAAAAAAAAAwMzMDAAAAAAAAAAAAAAH',
  '["Agility", "Haste", "Mastery", "Critical Strike", "Versatility"]',
  '[
    {"name":"Serenity","description":"Core cooldown — replaces Storm, Earth and Fire for significantly higher burst ceilings"},
    {"name":"Whirling Dragon Punch","description":"High priority AoE — use on CD inside every Serenity window"},
    {"name":"Strike of the Windlord","description":"Massive damage ability — align with every Serenity cast for maximum impact"},
    {"name":"Invoke Xuen, the White Tiger","description":"Additional cooldown — stack with Serenity whenever cooldown timings allow"},
    {"name":"Dance of Chi-Ji","description":"Free Spinning Crane Kick procs — prioritize consuming stacks on 3+ targets"}
  ]',
  '{"path":"Conduit of the Celestials","reason":"M+ standard — Celestial Conduit empowers Serenity burst with group-wide benefits and smoother cooldown alignment","keyNodes":["Celestial Conduit","Unity Within","August Celestials"]}',
  '[
    {"slot":"Tier Set","item":"Midnight Sanctum 4-piece","notes":"Essential — directly boosts Serenity damage by a significant margin"},
    {"slot":"Trinket 1","item":"Treacherous Transmitter","notes":"Strong on-use — syncs with Serenity burst windows every pull"},
    {"slot":"Trinket 2","item":"Voidforged Shard","notes":"Passive Agility stat stick for consistent throughput between cooldowns"}
  ]'
) on conflict (spec_id, content_type) do nothing;
