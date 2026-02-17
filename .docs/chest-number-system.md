# Chest Number Assignment System

## Overview

The chest number system automatically assigns unique identification numbers to participants when they register for events. This system is already fully implemented and working.

## How It Works

### For Individual Events

When a user registers for an individual event:

1. System reads the current counter for that event from Firestore (`counters/{eventTitle}`)
2. Increments the counter by 1
3. Generates chest number: `{shortCode}{100 + counter}`
4. Stores the chest number in `event_registrations` collection

**Example:**

- Event: "Solo Dance" (shortCode: `SOLO`)
- Counter: 5
- Chest Number: `SOLO105`

### For Group Events

When a team leader creates a team:

1. System reads the current counter for that event
2. Increments the counter by 1
3. Generates chest number using event's short code: `{shortCode}{100 + counter}`
4. Stores the chest number in both `teams` and `event_registrations` collections

**Example:**

- Event: "MIME" (shortCode: `MIME`)
- Counter: 3
- Chest Number: `MIME103`

## Short Codes Reference

### Group Events (from jhalakRulesData.ts)

| Event             | Code | Type      |
| ----------------- | ---- | --------- |
| Quiz              | QU   | Off-Stage |
| Debate            | DE   | Off-Stage |
| Mime              | MI   | On-Stage  |
| Group Song        | GS   | On-Stage  |
| Thiruvathira      | TH   | On-Stage  |
| Group Dance       | GD   | On-Stage  |
| Step N Synchro    | SNS  | On-Stage  |
| Nostalgia         | NO   | On-Stage  |
| Oppana            | OP   | On-Stage  |
| Fashion Show      | FS   | On-Stage  |
| Margam Kali       | MK   | On-Stage  |
| Vattapaatu        | VA   | On-Stage  |
| Group Folks' Song | GFS  | On-Stage  |

### All Events (from constant.ts)

Each event in the `categories` array has a `shortCode` property that is used for chest number generation.

## Database Structure

### Collections

#### 1. `counters/{eventTitle}`

```typescript
{
  count: number; // Current counter value for the event
}
```

#### 2. `event_registrations/{regId}`

```typescript
{
  type: 'individual' | 'team',
  userId?: string,           // For individual
  teamId?: string,           // For team
  chestNo: string,           // Generated chest number
  eventTitle: string,
  leaderId?: string,         // For team
  memberIds?: string[],      // For team
  registeredAt: Timestamp
}
```

#### 3. `teams/{teamId}`

```typescript
{
  id: string,
  eventId: string,
  eventTitle: string,
  leaderId: string,
  members: TeamMember[],
  memberIds: string[],
  status: 'confirmed' | 'cancelled',
  chestNo: string,           // Team's chest number
  createdAt: string
}
```

#### 4. `registrations/{userId}`

```typescript
{
  userId: string,
  events: string[],          // Array of event titles
  lastUpdated: string
}
```

## Transaction Safety

The chest number generation uses Firestore transactions to ensure:

- **Atomicity**: Counter increment and registration creation happen together
- **Uniqueness**: No two registrations get the same chest number
- **Consistency**: If registration fails, counter is not incremented

## Implementation Files

1. **`lib/registrationService.ts`**
   - `createTeam()` - Lines 106-195 (Group event registration)
   - `updateUserSoloRegistrations()` - Lines 197-278 (Individual event registration)
   - Chest number generation logic on lines 154-155 and 230-231

2. **`data/constant.ts`**
   - Event definitions with `shortCode` property
   - Used as the prefix for chest numbers

3. **`data/jhalakRulesData.ts`**
   - `groupEventCodes` array with event codes reference

## Example Chest Numbers

### Individual Events

- `KARA101` - First Karaoke registration
- `MONO102` - Second Monoact registration
- `SOLO103` - Third Solo Dance registration

### Group Events

- `MIME101` - First MIME team
- `GRPDA102` - Second Group Dance team
- `THIR103` - Third Thiruvathira team

## Admin Features

Administrators can:

1. Query `event_registrations` collection to get all registrations for an event
2. Export data with chest numbers for event management
3. Track registration counts via the `counters` collection
4. View team details including all member IDs and chest numbers
