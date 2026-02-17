export const jhalakGeneralRules = [
    "All students are allowed to wear colour dress with college ID card.",
    "No outsiders are permitted inside the college campus.",
    "The competitions are held on house basis.",
    "A student can participate up to a maximum of four off-stage events.",
    "A student can participate up to a maximum of three individual on-stage events and two group items.",
    "The participant should report at the venue as per the schedule.",
    "If he/she fails to present on stage, marks will be reduced for individual items as well as for group items from respective teams.",
    "All participants should make sure that their presentation is decent.",
    "Songs for dance items, karaoke etc. should be submitted to the arts representative before 1 days of arts day.",
    "The theme for all items should not be abusive or disturbing of any kind.",
    "The judge's decisions will be final, and no appeals will be entertained.",
    "Any act of indiscipline will be viewed very seriously and disciplinary actions will be taken. Also, there will be a reduction of points from the respective houses.",
    "Participants must bring their own costumes, properties, instruments, and materials unless otherwise notified.",
    "The organizing committee is not responsible for loss or damage of personal items.",
    "The decision of the judges shall be final and binding.",
    "No arguments or appeals regarding results will be entertained.",
    "Malpractice, impersonation, or unfair assistance will result in disqualification.",
    "Any damage to college property will be charged to the participant(s) concerned.",
    "Participation certificates will be issued only to students who actually perform.",
    "Time limits prescribed for each event must be strictly followed.",
    "Background tracks must be submitted in the specified format before the deadline.",
    "Chest numbers must be collected in advance and worn visibly throughout the on-stage events.",
    "Vulgar, offensive, political or religiously sensitive content is strictly prohibited.",
    "A minimum of 4 registration is required for conducting an event."
];

export const scoringData = [
    { place: "1", single: 5, group: 10 },
    { place: "2", single: 3, group: 6 },
    { place: "3", single: 1, group: 2 },
];

export const negativeMarkingData = [
    { offense: "Abusive Themes", marks: 10 },
    { offense: "Variation in Screened items", marks: 10 },
    { offense: "In-Disciplinary Actions", marks: 5 },
    { offense: "Not reporting for the event", marks: 3 },
    { offense: "Late reporting for the event", marks: 2 },
];

export const groupEventCodes = [
    { name: "Quiz", code: "QU", type: "Off-Stage" },
    { name: "Debate", code: "DE", type: "Off-Stage" },
    { name: "Face Painting", code: "FP", type: "Off-Stage" },
    { name: "Mehendi Designing", code: "MD", type: "Off-Stage" },
    { name: "Movie Scene Recreation", code: "MSR", type: "Online" },
    { name: "Mime", code: "MI", type: "On-Stage" },
    { name: "Group Song", code: "GS", type: "On-Stage" },
    { name: "Thiruvathira", code: "TH", type: "On-Stage" },
    { name: "Group Dance", code: "GD", type: "On-Stage" },
    { name: "Step N Synchro", code: "SNS", type: "On-Stage" },
    { name: "Nostalgia", code: "NO", type: "On-Stage" },
    { name: "Oppana", code: "OP", type: "On-Stage" },
    { name: "Fashion Show", code: "FS", type: "On-Stage" },
    { name: "Margam Kali", code: "MK", type: "On-Stage" },
    { name: "Vattapaatu", code: "VA", type: "On-Stage" },
    { name: "Group Folks' Song", code: "GFS", type: "On-Stage" },
];

export const screeningInfo = `It is informed that there will be a screening for all items (Excluding music items) before the original performance. The entire script, plot and theme must be submitted before the screening committee. If there are any variations to the above items when performed on stage, participants and group will be disqualified from the respective events resulting in negative marks for the house. It is the duty of house captains to ensure timely participation and discipline of their house members.`;

export const groupEventInfo = `For group events, the team leader (any one member nominated from the team) shall complete the registration process for the event on behalf of all participants. The team leader will also be responsible for submitting the list of team members, verifying participant details, and coordinating all official communications related to the event. For group event performances, specific event codes will be assigned to ensure proper identification and smooth coordination. These codes will be used for registration, scheduling, and performance management.`;
