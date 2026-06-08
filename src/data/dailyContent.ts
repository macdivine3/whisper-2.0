// app/data/dailyContent.ts
// 📚 ALL DAILY CONTENT IN ONE FILE (Stories, Morning & Night Whispers)

export interface Story {
  id: string;
  date: string;
  title: string;
  content: string;
  deepComment: string;
  verse: string;
  theme: string;
  emotion: string;
}

export interface MorningWhisper {
  day: number;
  title: string;
  verse: string;
  reference: string;
  reflection: string;
  socialCaption?: string;
}

export interface NightWhisper {
  day: number;
  title: string;
  message: string;
  whisper: string;
  socialCaption?: string;
}

// 🌅 MORNING WHISPERS (33 total)
export const morningWhispers: MorningWhisper[] = [
  {
    day: 1,
    title: "He Heals",
    verse: "He heals the brokenhearted and binds up their wounds.",
    reference: "Psalm 147:3",
    reflection: "your pain is not the end. God is already stitching you back together.",
    socialCaption: "Your pain is not the end."
  },
  {
    day: 2,
    title: "Close to You",
    verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    reference: "Psalm 34:18",
    reflection: "you are never abandoned. God sits with you in the places that hurt.",
    socialCaption: "You are never abandoned."
  },
  {
    day: 3,
    title: "Fragile but Held",
    verse: "A bruised reed He will not break.",
    reference: "Isaiah 42:3",
    reflection: "God knows your strength is thin. He holds you gently, not harshly.",
    socialCaption: "You don't have to hold yourself up."
  },
  {
    day: 4,
    title: "Find Rest",
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
    reflection: "you don't have to carry everything alone. rest is waiting for you.",
    socialCaption: "Rest is waiting for you."
  },
  {
    day: 5,
    title: "Mended",
    verse: "He has sent me to bind up the brokenhearted.",
    reference: "Isaiah 61:1",
    reflection: "God doesn't ignore your wounds. He treats them.",
    socialCaption: "God treats wounds, He doesn't ignore them."
  },
  {
    day: 6,
    title: "A Heart He Won't Reject",
    verse: "A broken and contrite heart You will not despise.",
    reference: "Psalm 51:17",
    reflection: "your brokenness doesn't push God away — it pulls Him in closer."
  },
  {
    day: 7,
    title: "Revived",
    verse: "I revive the spirit of the lowly and the contrite.",
    reference: "Isaiah 57:15",
    reflection: "God breathes life back into the parts of you that feel dead."
  },
  {
    day: 8,
    title: "Strength Inside Weakness",
    verse: "My flesh and my heart may fail, but God is the strength of my heart.",
    reference: "Psalm 73:26",
    reflection: "when your own strength collapses, His strength steps in."
  },
  {
    day: 9,
    title: "Sufficient",
    verse: "My grace is sufficient for you.",
    reference: "2 Corinthians 12:9",
    reflection: "you don't need to be enough. His grace already is."
  },
  {
    day: 10,
    title: "He Cares",
    verse: "Cast all your anxiety on Him because He cares for you.",
    reference: "1 Peter 5:7",
    reflection: "God isn't tired of hearing from you. tell Him everything."
  },
  {
    day: 11,
    title: "Delighted in You",
    verse: "The Lord delights in those who hope in His unfailing love.",
    reference: "Psalm 147:11",
    reflection: "God smiles when you trust Him, even in small ways."
  },
  {
    day: 12,
    title: "Help in Weakness",
    verse: "The Spirit helps us in our weakness.",
    reference: "Romans 8:26",
    reflection: "you're not praying alone — the Spirit fills in the words you can't speak."
  },
  {
    day: 13,
    title: "He Sustains",
    verse: "Cast your burden on the Lord and He will sustain you.",
    reference: "Psalm 55:22",
    reflection: "give Him what's too heavy. you were never meant to lift it alone."
  },
  {
    day: 14,
    title: "Through the Waters",
    verse: "When you pass through the waters, I will be with you.",
    reference: "Isaiah 43:1–2",
    reflection: "God doesn't remove the storms, He walks you through them."
  },
  {
    day: 15,
    title: "The One Who Heals",
    verse: "Though He wounds, He also binds up.",
    reference: "Job 5:18",
    reflection: "God never breaks you to leave you. He restores deeper than before."
  },
  {
    day: 16,
    title: "Seen in Suffering",
    verse: "He has not hidden His face from the afflicted.",
    reference: "Psalm 22:24",
    reflection: "even when you feel unseen, God is watching with compassion."
  },
  {
    day: 17,
    title: "Take Heart",
    verse: "In this world you will have trouble… but take heart.",
    reference: "John 16:33",
    reflection: "your battles don't have the final word — He already won."
  },
  {
    day: 18,
    title: "Compassion Comes",
    verse: "Though He brings grief, He will show compassion.",
    reference: "Lamentations 3:31–32",
    reflection: "pain isn't permanent. compassion is on the way."
  },
  {
    day: 19,
    title: "Lifted",
    verse: "He lifted me out of the slimy pit.",
    reference: "Psalm 40:1–2",
    reflection: "no matter how deep you feel stuck, God can pull you out."
  },
  {
    day: 20,
    title: "No More Tears",
    verse: "He will wipe every tear from their eyes.",
    reference: "Revelation 21:4",
    reflection: "one day, sorrow dies. every tear is counted until then."
  },
  {
    day: 21,
    title: "Help Comes",
    verse: "My help comes from the Lord.",
    reference: "Psalm 121:1–2",
    reflection: "when you look up, hope rises with you."
  },
  {
    day: 22,
    title: "Come Boldly",
    verse: "Let us come boldly to the throne of grace.",
    reference: "Hebrews 4:16",
    reflection: "you're welcome in His presence — not tolerated, welcomed."
  },
  {
    day: 23,
    title: "He Goes Before You",
    verse: "The Lord Himself goes before you and will be with you.",
    reference: "Deuteronomy 31:8",
    reflection: "God is already standing in your tomorrow."
  },
  {
    day: 24,
    title: "Courage Within",
    verse: "Be strong and courageous… for the Lord your God is with you.",
    reference: "Joshua 1:9",
    reflection: "courage isn't loud. it's knowing you're never alone."
  },
  {
    day: 25,
    title: "Strength for All Things",
    verse: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    reflection: "the strength isn't yours — and that's the point."
  },
  {
    day: 26,
    title: "Working for Good",
    verse: "All things work together for the good of those who love Him.",
    reference: "Romans 8:28",
    reflection: "even the confusing pieces are part of a good plan."
  },
  {
    day: 27,
    title: "Understood",
    verse: "We have a High Priest who understands our weaknesses.",
    reference: "Hebrews 4:15",
    reflection: "Jesus doesn't just forgive you — He understands you."
  },
  {
    day: 28,
    title: "Refuge",
    verse: "God is our refuge and strength, an ever-present help in trouble.",
    reference: "Psalm 46:1",
    reflection: "run to Him. He's safe. He's steady. He's here."
  },
  {
    day: 29,
    title: "Loved First",
    verse: "While we were still sinners, Christ died for us.",
    reference: "Romans 5:8",
    reflection: "God loved you at your worst. you don't have to earn His love now."
  },
  {
    day: 30,
    title: "Peace That Guards",
    verse: "The peace of God will guard your heart and mind.",
    reference: "Philippians 4:6–7",
    reflection: "peace isn't a feeling — it's His presence standing guard."
  },
  {
    day: 31,
    title: "Wonderfully Made",
    verse: "I am fearfully and wonderfully made.",
    reference: "Psalm 139:14",
    reflection: "your existence isn't accidental. you carry intentional design."
  },
  {
    day: 32,
    title: "Always With You",
    verse: "I am with you always, to the very end of the age.",
    reference: "Matthew 28:20",
    reflection: "you will never walk a single day without Him beside you."
  },
  {
    day: 33,
    title: "Held by God",
    verse: "Cast your cares on Him.",
    reference: "1 Peter 5:7",
    reflection: "let go. let Him hold what's breaking you."
  }
];

// 🌙 NIGHT WHISPERS (50 total)
export const nightWhispers: NightWhisper[] = [
  {
    day: 1,
    title: "Dawn Is Coming",
    message: "you can't see the light right now, but that doesn't mean it isn't on its way. keep walking — morning always breaks.",
    whisper: "Even when I can't see the light, I'll still walk — because I know the dawn always comes.",
    socialCaption: "Morning always breaks. Keep walking."
  },
  {
    day: 2,
    title: "Still Being Made",
    message: "this isn't your ending — it's the messy middle where God is shaping something beautiful. you're not finished yet.",
    whisper: "This isn't the end of me; it's the middle of what God is making."
  },
  {
    day: 3,
    title: "I Know Who",
    message: "you don't need all the answers right now. you just need to remember the One who holds them all.",
    whisper: "I may not know how, but I know Who."
  },
  {
    day: 4,
    title: "Hope Is Resting",
    message: "hope didn't leave — it's just catching its breath. quietness doesn't mean it's gone.",
    whisper: "Hope isn't gone — it's just quiet right now."
  },
  {
    day: 5,
    title: "Learning to Wait",
    message: "closed doors aren't rejections — they're invitations to trust Him in the waiting. you're learning, not losing.",
    whisper: "Every closed door is teaching me how to wait better, not lose faith."
  },
  {
    day: 6,
    title: "Still Breathing",
    message: "your story isn't over. God is still writing, still working, still turning pages you haven't seen yet.",
    whisper: "My story is still breathing. God isn't done writing."
  },
  {
    day: 7,
    title: "Proof I Need Him",
    message: "the darkness doesn't mean He left — it means you still need His light. and He's right there, holding it.",
    whisper: "The darkness isn't proof God left; it's proof I still need His light."
  },
  {
    day: 8,
    title: "He Repurposes Pain",
    message: "nothing you've been through will be wasted. God is already turning your pain into purpose.",
    whisper: "God never wastes pain — He repurposes it."
  },
  {
    day: 9,
    title: "Grace Holds On",
    message: "even if you're barely holding on, grace is holding the other end. you won't fall.",
    whisper: "Even if all I can do is hold on by a thread, grace holds the other end."
  },
  {
    day: 10,
    title: "He'll Do It Again",
    message: "the same God who carried you before is carrying you now. He's never stopped being faithful.",
    whisper: "The same God who got me through before will do it again."
  },
  {
    day: 11,
    title: "Honest, Not Perfect",
    message: "you don't have to pretend you're okay. God meets you in the honesty, not the performance.",
    whisper: "I don't have to be okay — I just have to be honest with God."
  },
  {
    day: 12,
    title: "Healing Starts Here",
    message: "falling apart isn't failure — sometimes it's the first step toward healing. let yourself break open.",
    whisper: "Sometimes falling apart is just how healing begins."
  },
  {
    day: 13,
    title: "He Meets You There",
    message: "God doesn't wait for you to clean up before He shows up. He's already in the mess with you.",
    whisper: "God isn't repelled by my mess; He meets me in it."
  },
  {
    day: 14,
    title: "Still Held",
    message: "you're too weak to stand, and that's okay. you were never meant to hold yourself up — He's doing that.",
    whisper: "I'm too weak to stand, but I'm still held."
  },
  {
    day: 15,
    title: "Not Forever",
    message: "this pain is heavy and it's real — but it's not permanent. it won't always feel like this.",
    whisper: "This pain is real, but it's not forever."
  },
  {
    day: 16,
    title: "Loved Whole",
    message: "even in pieces, you are fully loved. brokenness doesn't make you less — it makes you human.",
    whisper: "Even in pieces, I'm still loved whole."
  },
  {
    day: 17,
    title: "Tears and Trust",
    message: "you can cry and still believe. grief and faith can sit in the same room together.",
    whisper: "I can cry and still trust Him. Those two can exist together."
  },
  {
    day: 18,
    title: "Surrender, Not Strength",
    message: "you don't need to be strong right now. you just need to let go and let Him carry it.",
    whisper: "I don't need strength right now — I just need surrender."
  },
  {
    day: 19,
    title: "Help Is Enough",
    message: "if the only prayer you can whisper is 'help,' that's enough. He hears it. He's already moving.",
    whisper: "If all I can pray is 'help,' it's enough."
  },
  {
    day: 20,
    title: "Where Pretending Ends",
    message: "rock bottom is where the masks come off and the real help begins. you don't have to be strong anymore.",
    whisper: "Rock bottom is where I stop pretending and start depending."
  },
  {
    day: 21,
    title: "Love Hasn't Changed",
    message: "God's love for you is the same as it's always been. your feelings shift — His heart doesn't.",
    whisper: "God's love hasn't changed — my emotions have."
  },
  {
    day: 22,
    title: "I've Just Forgotten",
    message: "He's never failed you. sometimes you just need to look back and remember all the ways He's shown up.",
    whisper: "He's never failed me; I've just forgotten how faithful He's been."
  },
  {
    day: 23,
    title: "Mercy Doesn't Drift",
    message: "even when you wander, His mercy stays. it's not fragile — it's relentless.",
    whisper: "Even when I drift, His mercy doesn't."
  },
  {
    day: 24,
    title: "Love Survives It All",
    message: "God's love isn't shaken by your doubt, your fear, or your failure. it's stronger than all of it.",
    whisper: "God's love is not fragile — it survives my doubt, my fear, my failure."
  },
  {
    day: 25,
    title: "Loved Right Here",
    message: "He didn't love a future version of you. He loved you — right here, right now, as you are.",
    whisper: "He didn't love a future version of me — He loved me, right here."
  },
  {
    day: 26,
    title: "He Came After Me",
    message: "you've run before, and He still came looking. His love doesn't quit when you do.",
    whisper: "I've run before, and He still came after me."
  },
  {
    day: 27,
    title: "Grace Runs Deeper",
    message: "grace doesn't run out — it just goes deeper the more you need it. there's always more.",
    whisper: "Grace doesn't run out — it runs deeper."
  },
  {
    day: 28,
    title: "Already Given",
    message: "you don't have to earn what's already been freely given. it's yours — just receive it.",
    whisper: "I don't have to earn what's already been freely given."
  },
  {
    day: 29,
    title: "Open Arms Waiting",
    message: "God hasn't turned His back. He's been facing you the whole time, arms wide open.",
    whisper: "God hasn't turned His back — He's been waiting with open arms."
  },
  {
    day: 30,
    title: "Faithful, Always",
    message: "His faithfulness doesn't depend on how consistent you are. it's steady, even when you're not.",
    whisper: "His faithfulness doesn't depend on my consistency."
  },
  {
    day: 31,
    title: "Trust the One Who Does",
    message: "you don't need to control everything. you just need to trust the One who already does.",
    whisper: "I don't need to control everything — I just need to trust the One who does."
  },
  {
    day: 32,
    title: "Peace Speaks Louder",
    message: "your thoughts are loud, but His peace speaks louder. listen closer — it's there.",
    whisper: "My thoughts are loud, but His peace speaks louder."
  },
  {
    day: 33,
    title: "Being Led",
    message: "you're not behind. you're not lost. you're being led — one step at a time.",
    whisper: "I'm not behind — I'm being led."
  },
  {
    day: 34,
    title: "He Handles Tomorrow",
    message: "anxiety lies about tomorrow. but God is already there, handling what you're afraid of.",
    whisper: "Anxiety lies about tomorrow; God handles it before I get there."
  },
  {
    day: 35,
    title: "He Already Knows",
    message: "breathe. God already knows what you're afraid of — and He's not worried.",
    whisper: "I can breathe. God already knows what I'm afraid of."
  },
  {
    day: 36,
    title: "Safe in His Hands",
    message: "release what you can't fix. it's safe in His hands, and so are you.",
    whisper: "I release what I can't fix — it's safe in His hands."
  },
  {
    day: 37,
    title: "Trust the Plan",
    message: "you don't have to see the whole plan to trust it's working. He sees what you can't.",
    whisper: "I don't have to see the plan to trust it's working."
  },
  {
    day: 38,
    title: "One Breath Away",
    message: "God's peace isn't far off — it's as close as your next deep breath. let it in.",
    whisper: "God's peace isn't distant; it's one deep breath away."
  },
  {
    day: 39,
    title: "His Presence Is Certain",
    message: "everything might feel uncertain, but His presence isn't. He's the one thing that never shifts.",
    whisper: "Even if everything feels uncertain, His presence isn't."
  },
  {
    day: 40,
    title: "Learning to Rest",
    message: "you're not failing — you're learning how to rest in Him instead of doing it all yourself.",
    whisper: "I'm not failing — I'm learning to rest."
  },
  {
    day: 41,
    title: "Grace Found Me",
    message: "God's grace didn't skip over you. it found you, right where you are.",
    whisper: "God's grace didn't skip me."
  },
  {
    day: 42,
    title: "Already Paid For",
    message: "your sin doesn't surprise Him — He already paid for it. nothing catches God off guard.",
    whisper: "My sin doesn't surprise Him — He already paid for it."
  },
  {
    day: 43,
    title: "Come Home",
    message: "shame says 'hide.' grace says 'come home.' and the door is wide open.",
    whisper: "Shame says 'hide'; grace says 'come home.'"
  },
  {
    day: 44,
    title: "Walk in Forgiveness",
    message: "you can't undo your past, but you can walk in forgiveness now. today is a new start.",
    whisper: "I can't undo my past, but I can walk in forgiveness now."
  },
  {
    day: 45,
    title: "The Cross Proved It",
    message: "you're not too dirty to be loved. the Cross already proved that you're worth everything.",
    whisper: "I'm not too dirty to be loved — the Cross already proved that."
  },
  {
    day: 46,
    title: "Mercy Meets Regret",
    message: "God's mercy meets you in the middle of your regret. you don't have to stay stuck there.",
    whisper: "God's mercy meets me in the middle of my regret."
  },
  {
    day: 47,
    title: "Jesus Took It",
    message: "you don't have to keep punishing yourself — Jesus already took it. the debt is paid.",
    whisper: "I don't have to keep punishing myself — Jesus already took it."
  },
  {
    day: 48,
    title: "Fallen, Not Forsaken",
    message: "you fell, but you're not forsaken. He's already reaching down to lift you back up.",
    whisper: "I fell, but I'm not forsaken."
  },
  {
    day: 49,
    title: "He Holds Hearts",
    message: "God doesn't hold grudges — He holds hearts. and yours is safe with Him.",
    whisper: "God doesn't hold grudges — He holds hearts."
  },
  {
    day: 50,
    title: "Restored, Not Replaced",
    message: "you're forgiven, not forgotten. restored, not replaced. you still matter to Him.",
    whisper: "I'm forgiven, not forgotten — restored, not replaced."
  }
];

// 📖 DAILY STORIES (20+ stories total)
export const dailyStories: Story[] = [
  // RANK: 10/10 - The most powerful grace story
  {
    id: "story-026",
    date: "2025-01-26",
    title: "The Owner's Dog",
    content: "Do you know what it's like to be seen as nothing but your worst moment?\n\nI was born in the back of a pet store. Cold floors. Fluorescent lights. Hands that only touched me when they had to. I learned quickly that the world was something to survive, not trust.\n\nThe other puppies got picked. One by one, they left in arms that held them gently. But I stayed. Weeks turned into months. I grew bigger, louder, angrier. When people walked by, I barked. When they reached for me, I snapped.\n\n'That one's too aggressive,' they'd say. 'Damaged.'\n\nI didn't know I was damaged. I just knew I was scared.\n\nThen one day, a man came. He didn't flinch when I growled. He crouched down, looked me in the eyes, and said to the store owner, 'I'll take him.'\n\nHis wife wasn't happy. 'He's mean. Look at him.'\n\nBut the man shook his head. 'He's not mean. He's afraid.'\n\nI didn't believe him. But I went home with them anyway.\n\nAt first, I kept my distance. I watched them from the corner—the man, his wife, their young son. They laughed a lot. The house smelled like warmth. But I stayed tense, ready. Waiting for the moment they'd hurt me like the rest.\n\nOne afternoon, the boy ran up to me, arms wide, wanting to hug me. And I panicked. I didn't mean to. I didn't want to. But my teeth found his arm before my brain caught up. The boy screamed. Blood. Chaos.\n\nThe wife scooped him up, tears streaming. 'I told you! I told you this dog was dangerous! We're taking him back. Now.'\n\nI pressed myself into the corner, shaking. This is it. I'm going back. Back to the cage. Back to the cold.\n\nThen the man came home. He saw his son's bandaged arm. Heard his wife's anger. Saw me cowering in the corner, teeth bared, ready for the punishment I knew I deserved.\n\nAnd he didn't yell. He didn't grab me by the collar or drag me to the car. He knelt down. Slowly. His eyes met mine—and I saw something I'd never seen before. Not anger. Not fear. Compassion.\n\n'I know you're scared,' he said softly. 'I know you've been hurt. But you're safe now. You don't have to be that dog anymore.'\n\nHe reached out his hand. I flinched. But he didn't pull back. He just waited. Patient. Present. And for the first time in my life... I let someone touch me without biting.\n\nHis wife protested. 'He hurt our son. He can't stay.'\n\nBut the man shook his head. 'He made a mistake. So have we. So has everyone. That doesn't mean he doesn't deserve a second chance.'\n\nHe looked at me again. 'You're staying. You're ours. And we're not giving up on you.'\n\nSomething broke in me that day. Not in a bad way. In the way that lets the light in. I stopped biting. I stopped growling at every hand that came near. I learned what it felt like to be wanted—not because I was perfect, but because someone saw past what I did to why I did it.\n\nYears later, I'd lie at that man's feet, and sometimes I'd think about the boy I bit. He forgave me too, you know. Used to sneak me treats when his mom wasn't looking. But it was the man I never forgot. The one who saw me at my worst and said, 'You're worth saving.'\n\nThere was a woman once, caught in the worst moment of her life. The kind of moment that defines you if you let it. People surrounded her, rocks in their hands, ready to make her pay. And then someone knelt down. Looked her in the eyes. Saw past the sin to the scared, broken person underneath. And He said, 'Neither do I condemn you. Go, and sin no more.'\n\nHe didn't excuse what she did. But He didn't let it be the end of her story either. Some of us have been that dog. Some of us have been that woman. Condemned. Written off. Defined by our worst. But Jesus? He kneels down in the mess and says, 'You're worth saving.' Not because we're perfect. But because He sees us—really sees us—and loves us anyway.",
    deepComment: "No matter how sharp your teeth, grace still kneels down.",
    verse: "Then neither do I condemn you, Jesus declared. Go now and leave your life of sin. — John 8:11",
    theme: "grace",
    emotion: "reflective"
  },
  // RANK: 10/10 - High impact growth story
  {
    id: "story-027",
    date: "2025-01-27",
    title: "Dirt Turned to Soil",
    content: "Have you ever seen something so ugly you couldn't imagine it becoming beautiful?\n\nThere was a traveler passing through a foreign market when he saw it—a fruit unlike anything he'd encountered before. The vendor called it Celestia, a rare delicacy that only grew in the mountains, once every few years. The outside was stunning—deep purple skin that shimmered like twilight, smooth and perfect. He paid a small fortune for it.\n\nThat evening, in his inn room, he sliced it open, eager to taste something so rare. The flesh was sweet, golden, everything he'd hoped for. But when he reached the center, he froze. The seeds were hideous. Black. Slimy. Pulsing with a smell like rot and sulfur. They oozed a dark residue that stained his hands. He gagged, wrapped them in cloth, and shoved them in his bag, disgusted.\n\nThe next morning, he left town. Miles down the road, he stopped at the edge of a ditch and pulled out the cloth. He stared at the seeds one last time, then hurled them into the dirt. 'Good riddance,' he muttered, wiping his hands on his coat.\n\nThe seeds landed in the ditch—forgotten, discarded, unwanted. Locals passed by and saw them. One man kicked dust over them. 'What is this filth?' A woman wrinkled her nose. 'Probably something dead. Bury it.' So they did. They threw dirt on the seeds. Trash. Rocks. Anything to cover the ugliness. 'Nothing good comes from something like that,' they said.\n\nBut they didn't know what those seeds were.\n\nWeeks passed. Rain came. The dirt they'd thrown became soil. And deep beneath the surface, something shifted. The seed cracked open. A root pushed down. A shoot pushed up. No one noticed at first. But then a sapling appeared. Small. Fragile. Easy to overlook. Until it wasn't.\n\nThe sapling grew into a tree—massive, with branches like arms reaching toward the sky. Its leaves shimmered silver in the sunlight, and in the spring, it bloomed with flowers that smelled like honey and rain. The trunk was strong, the bark smooth, and the shade it cast was cool and welcoming.\n\nPeople started coming. Travelers rested beneath it. Families picnicked under its branches. Lovers carved their initials into the bark, whispering promises under its leaves. The tree became a landmark. 'Meet me at the Celestia Tree,' they'd say. 'You can't miss it.'\n\nYears later, the traveler passed through the same road. He was older now, grayer. The journey had worn him down. As he approached the town, he saw a crowd gathered near the edge of the road. Music. Laughter. He stopped to see what the fuss was about. There, standing tall and radiant, was the tree.\n\nHe stared, mouth open. 'What... what is that?' A woman nearby smiled. 'That's the Celestia Tree. Most beautiful tree for miles. No one knows where it came from. Some say it just appeared one day. A gift.'\n\nThe traveler's chest tightened. He walked closer, his hand trembling as he touched the bark. His mind flashed back to that evening in the inn. The black, oozing seeds. The disgust. The ditch. I threw this away, he thought. I buried it. But it hadn't stayed buried.\n\nA child ran past him, laughing, chasing another under the tree's shade. An old couple sat on a bench carved from its roots, holding hands. The traveler sank to his knees and whispered, 'I had no idea.'\n\nPeople threw dirt on you. Maybe they still are. They see your past—the mistakes, the ugliness, the parts of you that don't fit their idea of beautiful—and they assume that's all you'll ever be. They bury you with their words, their rejection, their judgments. They kick dust over your name and walk away.\n\nBut here's the truth: dirt only buries the dead. For a seed, it becomes soil.\n\nPaul was a murderer. He stood by while Stephen was stoned. He hunted down believers, dragged them from their homes, thought he was serving God by destroying the church. People had every reason to write him off. To say he was too far gone. Too stained. Too dangerous. But God didn't see a man buried in sin. He saw a seed planted in potential.\n\nAnd Paul became one of the greatest apostles who ever lived—not despite his past, but because God turned the weight of it into the roots of something new. The very thing meant to destroy him became the foundation of his calling.\n\nWhat they meant to bury you with, God is using to grow you. The dirt they threw? It's becoming your soil. The shame, the rejection, the pain—it's not the end. It's the environment where something greater takes root.",
    deepComment: "You are a seed. You can't be buried. Only planted.",
    verse: "But by the grace of God I am what I am, and his grace to me was not without effect. No, I worked harder than all of them—yet not I, but the grace of God that was with me. — 1 Corinthians 15:10",
    theme: "redemption",
    emotion: "empowering"
  },
  // RANK: 9.5/10 - Beautiful personal connection
  {
    id: "story-024",
    date: "2025-01-24",
    title: "Looking for Little Sharon",
    content: "Many years ago, when I started using glasses, I would wear them to bed, and as a result, I broke quite a number of them while sleeping. My mum would often question why I wore my glasses to bed. My reply was that I wanted to see in my dreams as well. I was only eight years old and it was strange that I required a substitute for my eyes.\n\nI had two problems with using glasses: they were either broken or misplaced. On several occasions, when I misplaced my glasses, I had always prayed to God to help me find them. Now that I write about it, I picture that cute little girl falling in tears, begging God to find her glasses as if He misplaced them on her behalf. With hot tears running down my face, I made promises to God. I felt like I was bribing Him to move Him to act.\n\n'God, I can't find my glasses again. Please help me find my glasses. I promise to dedicate my life to you. I promise to do this and this and this...' Well, with a little despondency and of course tears to move Him.\n\nI recall my first time leaving home to begin a new life, having gained admission into a secondary school in Osun State. I was barely nine years old. I remember my mum almost crying as she waved at me. The school itself was harsh, the teachers were cruel, the seniors were callous, the food was terrible. I hated every bit of it!\n\nAs a boarder, I noticed something peculiar to female students—a period of four to five days when ladies had to go about with sanitary pads. I found it fascinating. However, something was wrong. It wasn't the same with me. Every term, I returned to the hostel with sanitary towels, but unlike others, I brought them home with me. I was in a rush to become a woman. I began by praying and writing prophetically in a blue journal I owned at the time.\n\nWhy am I giving you all these stories? I wrote a letter recently that made me wonder: when did I lose little Sharon who had a habit of telling everything to God? What happened to the girl who prayed to find her glasses? Where is the little Sharon who prayed to become a day student? Where is the little Sharon who spent months praying to God about her period?\n\nThese days, just the big things go to God and I have to sort the little things myself. Adulting took away little Sharon from me and I am set to find her again. That little girl who talked everything over with God. That Sharon who was God's baby girl. That little girl who trusted God with the big and small things.\n\nI am searching for her, and when I find her, I am never losing her again.\n\nI'm curious whether you've lost touch with your younger self as well. I wonder if you also miss little you who had some pretty habit that you could bet you would never lose. Dear you, I hope you search for your little Sharon. I pray you find the strength to embark on this search.",
    deepComment: "When did we stop bringing the small things to God?",
    verse: "And he said: 'Truly I tell you, unless you change and become like little children, you will never enter the kingdom of heaven.' — Matthew 18:3",
    theme: "intimacy",
    emotion: "reflective"
  },
  // RANK: 9.5/10 - Powerful narrative of love
  {
    id: "story-022",
    date: "2025-01-22",
    title: "The One Who Waited",
    content: "They had argued again that morning. Small things, sharp words, tired hearts. By the time they reached the train station, she had already made her decision: I'm done. I'm leaving.\n\nHe didn't know. He just followed her because he always walked her there, always made sure she got on safely, always stayed until the doors closed.\n\nAt the platform, she turned to him and forced a smile. 'I want to pee. Just… wait for me here, okay?'\n\nHe nodded. 'Of course.'\n\nShe walked away—then slipped onto a different train, one going in the opposite direction. As the doors closed, guilt pricked her, but she swallowed it. He'll move on, she told herself. He'll get tired of waiting.\n\nWeeks passed. She met someone new—someone who talked big and loved loudly at first—until he didn't. She found herself discarded, left with a bruised heart and the sudden clarity that she had broken something gentle, something real.\n\nShe couldn't go back to him—not to fix things, not to rekindle anything—she just needed to apologize. To look him in the eyes and say, 'I shouldn't have left like that.'\n\nSo she returned to the train station. Same platform. Same concrete. Same cold air.\n\nAnd there he was. Sitting on the same bench. Hands in his pockets. Eyes scanning the crowd every few seconds, like he was still expecting her to come back from the bathroom.\n\nHer breath caught. She walked toward him slowly at first… then faster… then she broke into a run.\n\nWhen he looked up, she crashed into him, arms around his neck, tears shaking out of her like confession. 'You waited…' she whispered, disbelieving.\n\nHe held her tighter, as if afraid she'd vanish again. 'I told you,' he said softly, 'I'll never leave you. I'm always going to wait.'\n\nShe sobbed into his shoulder—not because she wanted him back, but because she finally understood what faithful love felt like.\n\nSome people walk away. Some people wander. But real love doesn't leave the platform. It waits. It watches. It hopes. It stands where you left it, ready the second you turn around. Just like God does.",
    deepComment: "Love doesn't leave the platform. It waits.",
    verse: "Never will I leave you; never will I forsake you. — Hebrews 13:5",
    theme: "faithfulness",
    emotion: "tender"
  },
  // RANK: 9.0/10 - Strong internal healing theme
  {
    id: "story-020",
    date: "2025-01-20",
    title: "Bones Heal Stronger",
    content: "Why do bones heal stronger at the break? When a bone fractures, your body doesn't just patch the gap and call it done. It sends extra calcium, extra collagen, extra everything to the site of the injury. A thick, dense mass forms around the break—what doctors call a callus. It's bulky at first, rough and uneven.\n\nBut over time, it hardens. And when it's fully healed, that spot—the exact place that broke—is stronger than the bone ever was before. Denser. More resilient. The same place rarely fractures again.\n\nThe break became the strongest part.\n\nThere was a woman who went through a betrayal that shattered her. A friendship she trusted, a relationship she thought was solid—gone. The fracture was deep. She felt weak, exposed, like she'd never trust anyone again.\n\nBut slowly, something unexpected happened. She started rebuilding—not just her life, but herself. She learned boundaries she'd never had. She found strength in places she didn't know existed. She became more discerning, more rooted, more honest about what she would and wouldn't tolerate.\n\nYears later, someone tried to hurt her the same way. And this time? It didn't break her. The place that once shattered was now the most fortified part of her character.\n\nYou carry scars—maybe not all of them visible. Heartbreak. Betrayal. Loss. Failure. And sometimes you look at those places and see only damage, only weakness. But what if those aren't your weak spots anymore? What if the places where you broke and healed are now the strongest parts of who you are? God doesn't just repair you. He reinforces you. Where you've been broken, He sends extra grace, extra resilience, extra strength. The wound becomes your fortress.",
    deepComment: "The break isn't your weak spot. It's your strongest.",
    verse: "He heals the brokenhearted and binds up their wounds. — Psalm 147:3",
    theme: "healing",
    emotion: "resilient"
  },
  // RANK: 9.0/10 - Inspiring perspective shift
  {
    id: "story-019",
    date: "2025-01-19",
    title: "Eagles in the Storm",
    content: "Do you know why eagles fly into storms instead of away from them? Most birds sense a storm coming and flee. They find shelter, hunker down, wait for it to pass. But not eagles.\n\nWhen an eagle feels the wind shift and sees the dark clouds roll in, it doesn't run. It spreads its wings and flies straight toward the storm. It finds the updraft—the powerful wind currents that come with the chaos—and uses them to lift itself above the turbulence.\n\nWhile other birds are grounded, hiding, the eagle is soaring. Not because the storm stopped. But because it used the storm to rise.\n\nThere was a man who lost his job unexpectedly. Bills piled up. Fear set in. Everyone around him said, 'Just survive this. Lay low. Wait it out.'\n\nBut something in him refused. Instead of shrinking back, he leaned into the discomfort. He took the risk he'd been avoiding for years—started the business he'd only dreamed about, reached out to people he thought were out of his league, bet on himself when logic said to play it safe.\n\nThe storm didn't stop. But he stopped letting it ground him. A year later, he looked back and realized: the very thing that terrified him had been the wind that lifted him higher than comfort ever could.\n\nWhat if the thing you're avoiding—the hard conversation, the risky move, the uncertain path—is actually the wind meant to lift you higher? What if God didn't send the storm to destroy you, but to show you what you're capable of when you stop running and start rising?",
    deepComment: "The storm isn't your enemy. It's your elevation.",
    verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint. — Isaiah 40:31",
    theme: "courage",
    emotion: "empowering"
  },
  // RANK: 9.0/10 - Powerful faith illustration
  {
    id: "story-025",
    date: "2025-01-25",
    title: "The Jeweler's Apprentice",
    content: "Have you ever been so afraid of losing something that you couldn't even try?\n\nA businessman once bought a massive diamond in South Africa, about the size of an egg yolk. But to his disappointment, the stone had a crack inside.\n\nHe took it to a skilled jeweler, hoping for advice. The jeweler examined it carefully and said: 'This diamond can be split into two perfect gems, each worth more than the original stone. But one wrong strike and it will shatter into worthless fragments. I won't take that risk.'\n\nThe businessman traveled the world, showing the diamond to jewelers in many countries. Each one gave the same answer: 'Too risky.'\n\nFinally, someone told him about an old master jeweler in Amsterdam known for his golden hands. He flew there the same day.\n\nThe old jeweler studied the diamond through his monocle and warned him again of the risk. The businessman interrupted: 'I've heard that story before. I'm ready. Just do it.'\n\nThe jeweler nodded, agreed on the price, then turned to a young apprentice working quietly nearby. The boy took the diamond, placed it on his palm, and struck it once, clean and precise.\n\nThe stone split beautifully into two flawless gems.\n\nWithout even looking up, he handed them back to the master.\n\nAstonished, the businessman asked: 'How long has he been working for you?'\n\nThe old jeweler smiled. 'This is his third day. He doesn't know the real value of the stone. That's why his hand didn't tremble.'\n\nSometimes the more we fear losing something, the less capable we become of doing what needs to be done. We know too much. We've calculated the cost. We've imagined every way it could go wrong. And that knowledge—that fear—paralyzes us.\n\nBut faith doesn't operate on fear. It operates on trust. The kind of trust that says, 'I don't know how valuable this is to everyone else, but I know whose hands it's in.' The apprentice didn't tremble because he trusted his master's instruction more than his own understanding.\n\nWhat if you stopped calculating the risk and just obeyed? What if the breakthrough you're waiting for is on the other side of a steady hand and a single strike?",
    deepComment: "Fear makes your hand tremble. Faith keeps it steady.",
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight. — Proverbs 3:5-6",
    theme: "faith",
    emotion: "empowering"
  },
  // RANK: 8.5/10 - Classic Whisper theme of transformation
  {
    id: "story-018",
    date: "2025-01-18",
    title: "The Pearls in Pain",
    content: "Do you know why pearls form inside oysters? It starts with something painful. A grain of sand, a parasite, something that doesn't belong—slips inside the oyster's shell. It irritates. It hurts. The oyster can't spit it out, can't shake it loose.\n\nSo it does something else.\n\nLayer by layer, the oyster coats the irritant with nacre—the same substance that lines its shell. Smooth, iridescent, protective. It doesn't happen overnight. It takes time. Months. Sometimes years. But slowly, what once caused pain becomes covered, transformed.\n\nAnd when someone finally opens that shell, they don't find the irritant anymore. They find a pearl.\n\nThere was a woman who carried bitterness for years—a wound someone left that never quite healed. She tried to ignore it, bury it, pretend it wasn't there. But it kept surfacing, sharp and uncomfortable.\n\nOne day, she stopped fighting it. She let God coat it—layer by layer—with grace, with forgiveness, with time. The hurt didn't disappear. But it changed. It became something that taught her compassion. Something that made her softer toward others carrying hidden pain.\n\nYears later, someone said, 'You have this wisdom about you. Where did that come from?' And she smiled, knowing the answer: from what once hurt the most.\n\nWhat irritates you, what hurts you, what feels like it doesn't belong in your story—God can turn it into something priceless if you let Him coat it with grace. The pain doesn't have to stay pain. It can become beauty. But only if you let Him work on it, layer by layer, in His time.",
    deepComment: "The irritant doesn't stay an irritant. It becomes a pearl.",
    verse: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. — James 1:2-4",
    theme: "transformation",
    emotion: "reflective"
  },
  // RANK: 8.5/10 - Core theme of resilience
  {
    id: "story-001",
    date: "2025-01-01",
    title: "The Broken Crayon",
    content: "There was a boy who had a blue crayon—his favorite. He carried it everywhere, coloring skies and oceans, proud of every stroke. But one day, he pressed too hard. The crayon snapped in half.\n\nHe stared at the two pieces in his palm, feeling the weight of what he'd broken. 'I ruined it,' he whispered. He thought about throwing it away, starting over with a new one.\n\nBut his father sat beside him, picked up both pieces, and said, 'Draw something.'\n\n'It's broken,' the boy said.\n\n'So draw broken,' his father replied.\n\nThe boy pressed the fractured crayon to paper—and it still bled blue. The same color. The same beauty. The line was shakier now, more honest, but it still painted. In fact, with two pieces, he could color twice as much sky at once.\n\nSometimes we feel too broken to be used—like our mistakes have disqualified us, like our cracks have made us worthless. But just like that crayon, even our broken pieces still carry color. God doesn't need us polished and perfect. He picks up what we think is ruined and says, 'Draw something.'",
    deepComment: "No matter how broken the crayon is, it still paints.",
    verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit. — Psalm 34:18",
    theme: "brokenness",
    emotion: "hopeful"
  },
  // RANK: 8.5/10 - Guidance in the dark
  {
    id: "story-017",
    date: "2025-01-17",
    title: "The Lantern in the Wind",
    content: "There was a young man who walked a forest trail every evening. The path was familiar—roots, stones, turns he could take with his eyes closed.\n\nBut one night, a sudden windstorm swept through the trees. Branches fell, dust filled the air, and the trail disappeared beneath leaves and shadows. He froze. Everything looked different in the dark.\n\nHe reached into his bag and pulled out a small lantern—one his mother had given him years ago. It wasn't bright. In fact, it only lit a few steps at a time.\n\n'This won't be enough,' he whispered.\n\nBut the wind howled, and standing still wasn't an option. So he lifted the little lantern and took one step. Then another. And with each step, the light moved forward—never showing the whole path, but always revealing just enough.\n\nHalfway through the forest, he stopped beside a fallen tree. Behind him, the trail was invisible again, swallowed by night. Ahead of him, he could only see three steps.\n\nBut he realized something: The lantern had guided him every place he needed to be—not all at once, but moment by moment.\n\nSometimes we want God to show the whole map—every twist, every turn, every outcome. But the Holy Spirit doesn't work like a floodlight. He works like a lantern: just enough light for the next step, just enough peace for the next decision, just enough strength for the next stretch of the journey.\n\nYou don't have to see everything to move. You only need to carry the lantern.",
    deepComment: "The light doesn't show everything—just what you need next.",
    verse: "Your word is a lamp to my feet and a light to my path. — Psalm 119:105",
    theme: "guidance",
    emotion: "steady"
  },
  {
    id: "story-009",
    date: "2025-01-09",
    title: "The Voiceless Bell",
    content: "There was a bell that hung in a tower, beautiful and bronze. But it never rang. It was kept polished, admired, protected from anything that might dent or damage it.\n\nOne day, a storm came. The wind threw debris against the tower, and something struck the bell—hard. A deep, resonating sound rolled out across the valley, louder and clearer than anyone expected.\n\nPeople stopped in the streets. 'I didn't know that bell could sound like that.'\n\nThe keeper climbed the tower and saw a dent in the bronze. He reached out to smooth it, but stopped. The bell had found its voice because it had been struck.\n\nWe fear the blows life gives us. We think pain silences us, that suffering makes us less. But sometimes God allows the strike not to break us, but to release what's been inside all along. A bell only makes sound when something hits it. Your hardest moments might be what finally let the world hear the song God put in you.",
    deepComment: "No matter how struck the bell, it still rings.",
    verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit. — Psalm 34:18",
    theme: "purpose",
    emotion: "empowering"
  },
  {
    id: "story-010",
    date: "2025-01-10",
    title: "The Unsigned Canvas",
    content: "There was a canvas that sat in an artist's studio, stretched and primed, leaning against the wall. It was perfect—clean, white, ready. But it stayed untouched for months.\n\nOther paintings around it were finished, framed, admired. The canvas watched them leave one by one, heading to galleries and homes. And it wondered, 'Why not me? What's wrong with me?'\n\nOne day, the artist finally approached. The canvas felt a surge of hope, but also fear. 'I'm not ready,' it thought. 'I don't know what I'm supposed to become.'\n\nThe artist smiled and picked up a brush. 'You don't need to know. You just need to be here.'\n\nThe first stroke was bold. Then another. Colors the canvas had never imagined—deep blues, fierce reds, soft golds. It wasn't painless. The brush pressed hard sometimes. But slowly, something emerged. Not what the canvas had pictured, but something more.\n\nBy the end, the canvas realized: it was never supposed to paint itself. It was supposed to hold still while the artist worked.\n\nWe wait to feel 'ready' before we step into what God's called us to. We think we need more skills, more confidence, more clarity. But a blank canvas isn't worthless—it's waiting for the artist's hand. God doesn't call the qualified. He qualifies the called. Your purpose isn't about being ready. It's about being willing.",
    deepComment: "No matter how blank the canvas, it still holds a masterpiece.",
    verse: "But Moses said to God, 'Who am I that I should go?'... And God said, 'I will be with you.' — Exodus 3:11-12",
    theme: "calling",
    emotion: "affirming"
  },
  {
    id: "story-011",
    date: "2025-01-11",
    title: "The Lighthouse in Daylight",
    content: "There was a lighthouse that stood on a rocky shore, tall and steady. During storms, its light cut through the fog, guiding ships safely to harbor. Sailors would thank God for it, and the lighthouse felt the weight of its purpose.\n\nBut most days, there were no storms.\n\nThe sun would shine. The sea would calm. And the lighthouse would stand there, unnoticed, its light invisible in the brightness of day. No ships called out in gratitude. No one seemed to need it.\n\nOne quiet afternoon, the lighthouse whispered to the wind, 'What's the point of me when there's no storm?'\n\nAnd the wind whispered back, 'You don't wait for the storm to become a lighthouse. You stand tall so that when the storm comes, you're already there.'\n\nYears later, when the fiercest storm in decades rolled in, the lighthouse didn't have to prepare. It didn't have to find its light. It just was—exactly where it needed to be, exactly what it was built for.\n\nWe feel purposeless in the quiet seasons—when no one's watching, when nothing dramatic is happening, when our calling feels invisible. But a lighthouse stands tall even when the sun is shining and no ships need guidance. Your calling exists even in the hidden years. God is building you in the daylight so you'll be unshakable in the dark.",
    deepComment: "No matter how quiet the day, the lighthouse still stands.",
    verse: "Whoever can be trusted with very little can also be trusted with much. — Luke 16:10",
    theme: "faithfulness",
    emotion: "steady"
  },
  {
    id: "story-012",
    date: "2025-01-12",
    title: "The River's Bend",
    content: "There was a river that dreamed of reaching the ocean. It started in the mountains, clear and fast, cutting straight down the valley. 'This is the way,' it thought. 'Direct. Purposeful.'\n\nBut then it hit a wall of stone.\n\nThe river couldn't go through, so it turned. Left, winding along the base of the mountain. It felt wrong—like a detour, a failure. 'I'm supposed to go that way,' it said, looking back at the straight path it could no longer take.\n\nBut as it bent, something happened. The river carved new valleys. It fed forests that wouldn't have grown otherwise. Animals came to drink. Villages formed along its banks. The bend wasn't a mistake—it was the shape the land needed.\n\nYears later, the river finally reached the ocean. And when it looked back, it saw that the winding path had touched more life than the straight one ever could have.\n\nWe panic when our plans change—when doors close, when paths redirect, when what we thought was 'the way' suddenly isn't available anymore. But a river doesn't flow in straight lines. It bends around rocks, through valleys, carving new paths. What looks like a detour might actually be the way you were meant to shape the landscape. God's plan isn't derailed by your turns—He is the turn.",
    deepComment: "No matter how much the river bends, it still reaches the sea.",
    verse: "In their hearts humans plan their course, but the Lord establishes their steps. — Proverbs 16:9",
    theme: "trust",
    emotion: "peaceful"
  },
  {
    id: "story-013",
    date: "2025-01-13",
    title: "The Soft Clay",
    content: "There was a potter who kept a lump of soft clay on his table. Visitors always asked why he didn't choose something stronger—stone, wood, metal.\n\nOne day a child finally asked, 'Why do you use clay? It breaks so easily.'\n\nThe potter smiled. 'That's why. I can shape it.'\n\nHe pressed his thumb into the clay, and it yielded. Not because it was weak, but because it was willing.\n\n'As long as it stays soft,' he said, 'I can turn it into anything. But the moment it tries to harden on its own, I can't use it anymore.'\n\nWe think strength is never bending, never breaking. But the Kingdom works differently: God shapes those who let Him.\n\nWhat the world calls weak, Heaven calls moldable.",
    deepComment: "Soft hearts find their strength in surrender.",
    verse: "My power is made perfect in weakness. — 2 Corinthians 12:9",
    theme: "surrender",
    emotion: "yielding"
  },
  {
    id: "story-014",
    date: "2025-01-14",
    title: "The Cracked Bell (Variant)",
    content: "There was an old bell in a church tower—rusty, cracked down the side. They hadn't rung it in years.\n\nOne stormy night the power went out. The new electric bells failed, and the only thing left was the old, broken one.\n\nThey pulled the rope. The bell shook, wavered… and then sang.\n\nIts sound wasn't perfect. It wobbled and trembled, but it carried farther than any new bell ever had. Through the rain, through the darkness, the cracked bell called the town together.\n\nSometimes our cracks give our voice a depth perfection never could. God doesn't silence the broken; He amplifies them.",
    deepComment: "Cracks don't silence the sound—they deepen it.",
    verse: "In my distress I called… and He heard my cry. — Psalm 18:6",
    theme: "brokenness",
    emotion: "triumphant"
  },
  {
    id: "story-015",
    date: "2025-01-15",
    title: "The Puzzle Piece",
    content: "A girl sat on the floor surrounded by puzzle pieces. She held one oddly-shaped piece—crooked, strange, nothing like the others.\n\n'This one doesn't fit anywhere,' she said.\n\nHer father knelt beside her. 'Maybe you're trying to place it too soon.'\n\nHe turned the picture on the box toward her—the full image. Then he pointed to the empty space near the corner. 'That piece belongs to the part you haven't reached yet.'\n\nShe stared at it, realizing she'd been judging the piece without seeing the whole picture.\n\nSometimes we look at seasons of our lives and think, 'This doesn't make sense… this doesn't fit.' But we're judging a moment without seeing the masterpiece.\n\nTrust means believing God knows where every piece belongs—even the strange ones.",
    deepComment: "The piece that doesn't fit yet will make perfect sense later.",
    verse: "Trust in the Lord with all your heart… — Proverbs 3:5",
    theme: "trust",
    emotion: "reassuring"
  },
  {
    id: "story-016",
    date: "2025-01-16",
    title: "The Boat in the Fog",
    content: "A fisherman took his son out on the lake early one morning. Fog covered the water—thick, heavy, blinding. The boy gripped the edge of the boat.\n\n'Dad, how do you know where you're going? You can't see anything.'\n\n'I don't need to see everything,' his father said, 'I just need to hear the shore.'\n\nThe boy listened, and underneath the silence, he heard it—soft waves brushing the sand in the distance.\n\n'We steer by sound,' his father said, 'not sight.'\n\nFaith is like that: Not seeing the whole journey, just moving toward the One who calls.",
    deepComment: "Faith listens when sight fails.",
    verse: "We live by faith, not by sight. — 2 Corinthians 5:7",
    theme: "faith",
    emotion: "calm"
  },
  {
    id: "story-002",
    date: "2025-01-02",
    title: "The Slow Seed",
    content: "There was a little boy who planted three seeds in a cup of soil.\n\nHe watered them every morning, checked them after school, and even whispered to them because he'd heard plants grow better when spoken to kindly.\n\nTwo of the seeds sprouted quickly—tiny green shoots pushing through the soil like they were racing toward the sun.\n\nBut the third cup stayed quiet.\n\nNo green. No movement. Just dirt.\n\nEach day the boy stared at it longer.\n\n'What's wrong with you?' he finally muttered.\n\nHe felt frustrated, embarrassed—even a little ashamed, as if the seed's silence meant he'd failed.\n\nOne afternoon, his teacher noticed him staring at the bare soil.\n\n'Still nothing?' she asked softly.\n\nHe shook his head. 'I think this one is dead. The others grew fast. This one didn't even try.'\n\nShe knelt beside him and said,\n\n'Some seeds grow slow because they're growing deep first.'\n\nThe boy blinked. 'Deep?'\n\n'Yes,' she smiled. 'Roots take time. Some things need to grow downward before they can grow upward.'\n\nThat day, he didn't give up.\n\nAnd a week later—when he wasn't even looking—a tiny green shoot finally broke through the surface.\n\nIt wasn't the tallest.\n\nIt wasn't the fastest.\n\nBut it was the strongest, because it had built roots no one could see.",
    deepComment: "What grows slow often lasts the longest.",
    verse: "Though it linger, wait for it; it will certainly come and will not delay. — Habakkuk 2:3",
    theme: "patience",
    emotion: "encouraging"
  },
  {
    id: "story-003",
    date: "2025-01-03",
    title: "The Cracked Mirror",
    content: "There was a mirror that hung in a grand hallway, polished and perfect. It reflected everything exactly as it was—smooth, flawless, pristine. People would glance at it and move on. It did its job quietly.\n\nOne day, the mirror fell. A crack split across its surface, jagged and obvious. The owner sighed, ready to replace it, but decided to leave it up for one more day.\n\nThat evening, the sun set at just the right angle. Light poured through the window and hit the cracked mirror—and something unexpected happened. The crack didn't just reflect the light. It fractured it. Suddenly, the whole hallway was filled with dancing rays, splinters of gold and amber painting the walls in ways the perfect mirror never could.\n\nThe crack had turned the mirror into a prism.\n\nSometimes we think our brokenness disqualifies us from reflecting God. We see our fractures and assume we're too damaged to show anything beautiful. But maybe it's the cracks that let the light scatter further. Maybe it's our brokenness that makes His glory visible in ways perfection never could.",
    deepComment: "No matter how cracked the mirror, it still reflects light.",
    verse: "But we have this treasure in jars of clay to show that this all-surpassing power is from God and not from us. — 2 Corinthians 4:7",
    theme: "brokenness",
    emotion: "reflective"
  },
  {
    id: "story-004",
    date: "2025-01-04",
    title: "The Bent Nail",
    content: "There was a carpenter who kept a jar of old nails on his workbench. Most were straight and shiny, ready to be hammered into fresh wood. But at the bottom of the jar was a bent nail—curved from being struck at the wrong angle, pulled out of a project that didn't work.\n\nOne day, his apprentice picked it up. 'Why keep this? It's ruined.'\n\nThe carpenter smiled, took the nail, and placed it against a piece of wood with a curve in it—a spot where a straight nail would split the grain. He tapped gently, and the bent nail followed the curve perfectly. It held where nothing else could.\n\n'Sometimes,' the carpenter said, 'what looks ruined is just shaped for a different purpose.'\n\nWe carry the bends life has given us—the mistakes, the wrong turns, the places where we got hammered down. We think we're too twisted to be useful. But God doesn't waste our bends. He sees the curves we've taken and knows exactly where we fit. Where we've been shaped by pain, He builds something only we can hold together.",
    deepComment: "No matter how bent the nail, it still holds.",
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. — Romans 8:28",
    theme: "purpose",
    emotion: "affirming"
  },
  {
    id: "story-005",
    date: "2025-01-05",
    title: "The Torn Map",
    content: "There was a traveler who carried a map passed down from his grandfather. It showed the way to a valley his family had spoken of for generations—a place of rest, of home.\n\nBut along the journey, the map tore. Right through the middle. Half the path was gone, ripped away by wind and time. The traveler sat on the side of the road, staring at the pieces, paralyzed.\n\nAn old woman walking by noticed him. 'Where are you going?' she asked.\n\n'I don't know anymore,' he said. 'My map is torn.'\n\nShe looked at the remaining piece in his hand. 'Does it show the next step?'\n\nHe squinted. It did. Just one. A bridge, two miles ahead.\n\n'Then walk to the bridge,' she said. 'The rest will come.'\n\nAnd it did. At the bridge, he met someone who knew the next part. And after that, another guide appeared. The destination never changed—but he learned to trust the journey one piece at a time.\n\nWe want the whole picture. We want to see every step before we take the first one. But sometimes God only gives us enough light for the next move. A torn map still shows the direction—we just have to trust that He'll reveal the rest when we need it.",
    deepComment: "No matter how torn the map, it still points home.",
    verse: "Your word is a lamp for my feet, a light on my path. — Psalm 119:105",
    theme: "trust",
    emotion: "steady"
  },
  {
    id: "story-006",
    date: "2025-01-06",
    title: "The Empty Cup",
    content: "There was a cup that spent its whole life being useful. It held water for the thirsty, tea for the tired, wine for celebrations. It was always full, always needed, always pouring out.\n\nUntil one day, it ran dry.\n\nIt sat on the table, hollow and light, feeling useless. 'I have nothing left to give,' it whispered.\n\nBut that night, someone picked it up—not to fill it with what it used to hold, but with something new. Clean water. Fresh purpose. A different kind of fullness.\n\nThe cup realized: it could only receive because it had been emptied.\n\nWe fear the seasons when we feel drained—when we have nothing left to offer, when our strength is gone, when we're running on fumes. But maybe God empties us not because we've failed, but because He wants to fill us with something we couldn't hold while we were still clinging to the old. Sometimes the emptiness isn't the end. It's the preparation.",
    deepComment: "No matter how empty the cup, it can still be filled.",
    verse: "He has filled the hungry with good things but has sent the rich away empty. — Luke 1:53",
    theme: "renewal",
    emotion: "restorative"
  },
  {
    id: "story-007",
    date: "2025-01-07",
    title: "The Rusted Key",
    content: "There was a key that once opened the most important door in the house. Polished brass, perfectly cut, it turned the lock with a satisfying click. But over time, it was forgotten in a drawer. Rust crept over it, dulling its shine, stiffening its edges.\n\nYears later, someone found it and shook their head. 'This is useless now.'\n\nBut when they tried the lock one more time—just to see—the key still turned. Slower, rougher, but it worked. The rust hadn't stolen its purpose. It just looked like it had.\n\nWe think we've lost our value when life tarnishes us—when we're not shiny anymore, when our edges feel worn, when we don't look like we used to. But God doesn't measure usefulness by appearance. A rusted key still unlocks the door it was made for. He doesn't discard what the world calls obsolete. He uses it anyway.",
    deepComment: "No matter how rusted the key, it still unlocks.",
    verse: "But God chose the foolish things of the world to shame the wise; God chose the weak things of the world to shame the strong. — 1 Corinthians 1:27",
    theme: "worth",
    emotion: "validating"
  },
  {
    id: "story-008",
    date: "2025-01-08",
    title: "The Wilted Seed",
    content: "There was once a gardener who planted seeds in the fall, just before the first frost. Her neighbor laughed. 'You're too late. Nothing will grow now.'\n\nThe seeds lay in the cold ground all winter, silent and still. They looked dead. The neighbor walked by and said, 'See? I told you.'\n\nBut the gardener smiled and waited.\n\nWhen spring came, the ground warmed, and those seeds—the ones that had looked lifeless for months—burst through the soil with a strength the neighbor had never seen. They grew taller, fuller, more vibrant than anything planted in easier seasons.\n\n'They needed the cold,' the gardener said. 'It made them ready.'\n\nWe panic when nothing seems to be happening—when prayers feel unanswered, when growth feels invisible, when we look around and everyone else seems to be blooming while we're still buried. But what looks like death might just be dormancy. God's timing isn't our timing. Sometimes He plants us in the dark, in the cold, not to kill us—but to prepare us for a season we're not ready for yet.",
    deepComment: "No matter how wilted the seed, it still holds life.",
    verse: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles. — Isaiah 40:31",
    theme: "waiting",
    emotion: "patient"
  },
  {
    id: "story-021",
    date: "2025-01-21",
    title: "Jane's First Prayer",
    content: "Jane was thirteen, old enough to have questions she didn't know how to ask out loud. She had grown up hearing about God—Sunday school, bedtime prayers, memory verses—but none of it felt real. Not yet.\n\nHer father raised cows on a small farm. Normally his cows were strong and healthy—black and white and sturdy. But that year something strange happened: the calves stopped coming, and the older cows began dying one by one. The farm grew quieter every week.\n\nOne evening, Jane stood at the fence watching her father in the field, his shoulders heavy, his hands shaking a little when he thought no one saw. For the first time in her life, Jane whispered a prayer that wasn't memorized:\n\n'God… if You're real… please make the cows stop dying. Please let the last one live. Please show me You hear me.'\n\nDays passed. Then one morning, before the sun fully rose, her father shouted her name. She ran outside barefoot. There in the grass lay the last pregnant cow—alive, breathing, and beside her, a newborn calf. Healthy. Strong. Not weak like the others had been.\n\nJane's father laughed and cried at the same time. But Jane just stared at the calf, because something else caught her eye. Its fur was white and black like the others, but on its forehead was a patch shaped like a single letter—J.\n\nShe pressed her hand to her mouth. Her name. Her question. Her prayer. It wasn't just an answer. It was personal.\n\nThat day, Jane didn't say much. She didn't run around telling the whole town. She simply stood there beside the calf and whispered: '…I believe You.'",
    deepComment: "Sometimes God answers so personally, you can't call it coincidence.",
    verse: "Call to Me and I will answer you… — Jeremiah 33:3",
    theme: "faith",
    emotion: "wonder"
  },
  {
    id: "story-023",
    date: "2025-01-23",
    title: "The Weight I Couldn't Carry",
    content: "He used to think strength meant never breaking. So he held everything in—pain, shame, the need to prove he was okay. But life has a way of pressing until even pride begins to crack.\n\nOne night, sitting on the floor of his room, he finally whispered, 'God, I can't do this anymore.' And for the first time, silence didn't feel empty—it felt like Someone was listening.\n\nIn that stillness, he realized something: maybe weakness wasn't failure. Maybe it was where grace finally had space to breathe. So he stopped trying to fix himself and let God hold what he couldn't.\n\nThe weight didn't disappear. But somehow, it didn't crush him anymore. He was still tired, still healing, but lighter—in the way surrender makes you lighter.",
    deepComment: "Sometimes grace doesn't lift the weight—it teaches you how to rest under it.",
    verse: "My grace is sufficient for you, for my power is made perfect in weakness. — 2 Corinthians 12:9",
    theme: "grace",
    emotion: "quiet-surrender"
  },
  {
    id: "story-029",
    date: "2025-01-29",
    title: "The Resignation Letter",
    content: "Have you ever made a mistake so big you were sure it was over?\n\nMarcus had worked at the firm for three years. Good employee. Dependable. The kind of guy who stayed late and double-checked his work. But that Tuesday, he missed something. One decimal point in the wrong place. One oversight in a contract. And it cost the company $47,000.\n\nWhen he realized what he'd done, his hands went cold. He sat at his desk staring at the screen, the numbers blurring together. This is it. I'm done.\n\nThe boss, Mr. Luther, wasn't known for mercy. He was sharp, efficient, and didn't tolerate carelessness. People had been let go for less. Marcus waited for the email. The call to the office. The meeting that ends with 'We're going to have to let you go.' But nothing came.\n\nDay one: Silence. Day two: Still nothing. Day three: Marcus couldn't take it anymore. He thought, Maybe he's waiting for me to quit. Maybe he doesn't want to fire me—he just wants me gone.\n\nSo Marcus typed up his resignation letter. Short. Professional. 'Effective immediately.' He printed it, walked to Mr. Luther's office, and slid it across the desk.\n\nMr. Luther looked at it. Then looked at him. 'No.'\n\nMarcus blinked. 'Sir?'\n\n'I'm not accepting this.'\n\n'But... but I cost you—'\n\nMr. Luther leaned back in his chair, fingers steepled. 'Forty-seven thousand dollars. I know. I also know I've invested three years of training, resources, and trust into you. You think I'm going to let that walk out the door over one mistake?'\n\nMarcus's throat tightened. 'I thought—'\n\n'You thought I'd throw you away.' Mr. Luther shook his head. 'That's not how this works. You made a mistake. You'll learn from it. And you'll be better because of it. Now get back to work.'\n\nMarcus stood there, stunned. Then he nodded, grabbed the letter, and left. He didn't just learn about spreadsheets that day. He learned about grace.\n\nSometimes we mess up—badly—and we assume God is done with us. We start drafting our own resignation letter. 'I'm not good enough. I've failed too many times. He's probably just waiting for me to walk away.' But God doesn't work like that. He didn't invest His Son in you to let you go over a mistake. The true measure of being godly isn't a flawless record—it's the ability to get back up after you fall. He's not waiting for you to quit. He's waiting for you to keep going.",
    deepComment: "God didn't invest that much to let you go that easily.",
    verse: "For I am convinced that neither death nor life... will be able to separate us from the love of God. — Romans 8:38-39",
    theme: "perseverance",
    emotion: "hopeful"
  },
  {
    id: "story-030",
    date: "2025-01-30",
    title: "The Shepherd and the Wolf",
    content: "Why would anyone fight that hard for something they could just replace?\n\nI was walking through the hills one evening when I saw it—a wolf, low and prowling, circling a flock of sheep. And standing between them was the shepherd. He didn't run. He didn't call for help. He just stood there, staff in hand, eyes locked on the wolf.\n\nThe wolf lunged. The shepherd swung. The crack of wood against bone echoed across the valley. The wolf snarled, snapped, came at him again. And again. The shepherd took hits—claws raking his arm, teeth grazing his side—but he didn't back down.\n\nFinally, the wolf retreated, limping into the trees. The shepherd stood there, bloodied, breathing hard. His sheep huddled behind him, unharmed.\n\nI approached slowly. 'Are you alright?' He nodded, wincing as he pressed a hand to his ribs. I looked at the flock. 'Why fight that hard? You could've let the wolf take one. Saved yourself the pain. Saved the rest.'\n\nHe looked at me like I'd said something strange. Then he looked back at his sheep—every single one of them. 'They're all mine,' he said simply. 'And I'll do anything for them.'\n\nI didn't say anything else. What could I say? I just watched him limp back toward the flock, and one by one, the sheep followed him home.\n\nGod doesn't do cost-benefit analysis with your soul. He doesn't weigh whether you're 'worth it.' He doesn't let the enemy have you just to avoid the fight. You're His. And He'll go to any length—even the cross—to bring you home.",
    deepComment: "The shepherd doesn't negotiate. He fights.",
    verse: "I am the good shepherd. The good shepherd lays down his life for the sheep. — John 10:11",
    theme: "love",
    emotion: "empowering"
  },
  {
    id: "story-031",
    date: "2025-01-31",
    title: "The Birthday in the Dark",
    content: "Do you know what it's like to hope for something and convince yourself it won't happen?\n\nSarah was seventeen. Popular. Pretty. The kind of girl everyone assumed had it all together. But at home, the house was quiet. Too quiet. Her mom had died six months earlier. Cancer. Fast and brutal. And her dad—he'd buried himself in work. Traveling. Meetings. Conference calls. Anything to not sit in the silence where her mom used to be.\n\nSarah understood. She didn't blame him. But she missed him. Her birthday was coming up. She didn't say anything. Didn't remind him. Didn't want to guilt him into caring. If he remembers, he remembers, she told herself.\n\nThe day came. No text in the morning. No call at lunch. By dinner, she'd stopped checking her phone. Her friends threw her a party that night—loud music, laughter, cake. She smiled through all of it. But inside, she felt hollow.\n\nAt 10:58 PM, she came home. The house was dark. She fumbled for her keys, pushed the door open, and reached for the light switch—the room exploded in color. Balloons. Streamers. A banner that said 'Happy Birthday, Sarah' in her favorite shade of red. And standing in the middle of it all, holding a single red rose, was her dad.\n\nShe froze. He smiled, tired but warm. 'Surprise.' Her voice cracked. 'You... you remembered?' 'Of course I did.' She dropped her bag and ran to him, tears streaming, arms around his neck. He held her tight, and she cried into his shoulder—not sad tears, but relief. The kind that comes when you realize you weren't forgotten.\n\n'I thought you didn't care,' she whispered. 'I never stopped caring,' he said. 'I've just been... lost. But I'm here. I'm always here.'\n\nSometimes God feels distant. Silent. Like He's too busy, too far away, too caught up in bigger things to notice you. But He's not. He remembers. Every detail. Every hurt. Every hope. And even when it feels like He's absent, He's already preparing something you can't see yet. He hasn't forgotten you. He never will.",
    deepComment: "God doesn't forget. He's just preparing the room.",
    verse: "Can a mother forget the baby at her breast and have no compassion on the child she has borne? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands. — Isaiah 49:15-16",
    theme: "presence",
    emotion: "peaceful"
  },
  {
    id: "story-032",
    date: "2025-02-01",
    title: "The Singer Who Lost Her Spark",
    content: "Do you remember the last time you created something just because it made you feel alive?\n\nShe was seventeen when she wrote the song. It wasn't planned. She'd had a fight with her mom and she needed to get out of the house. So she grabbed her guitar and walked to the beach. The sun was setting. The waves were loud. And sitting there on the sand, she started playing. Not for anyone. Not for anything. Just because something inside her needed to get out.\n\nBy morning, it had 10,000 views. By the end of the week, 2 million. Record labels started calling. At seventeen, she signed a deal. At nineteen, she was in the studio every day, chasing the thing that had come so effortlessly on that beach. But it wouldn't come. She wasn't writing for herself anymore. She was writing for streams. For charts. For people she'd never meet who expected her to recreate magic on command.\n\nMonths passed. She started losing sleep. One night someone handed her a pill. 'It'll help you focus.' She took it. Then another. And suddenly, the pressure didn't feel so heavy. Until she was at a party and someone handed her a guitar. 'Sing something,' they said. She opened her mouth. Nothing came out. Not a note. Not a word. Just silence.\n\nRehab saved her life. But it didn't bring back her music. When she got out, she tried again. Same studio. Same producer. Nothing. The spark was gone. She drove back to her hometown beach. The same stretch of sand. She just sat there. For an hour. Maybe two. And she whispered, 'I miss you.'\n\nThe wind picked up. And then—quiet, fragile—a melody started forming in her head. Not the radio-ready kind. The raw, honest, hers kind. She hummed the melody. And slowly—painfully, beautifully—the song came back. Not because she tried harder. But because she stopped performing and started creating again.",
    deepComment: "The spark returns when you stop performing and start creating again.",
    verse: "He brought me out into a spacious place; he rescued me because he delighted in me. — Psalm 18:19",
    theme: "restoration",
    emotion: "reflective"
  },
  {
    id: "story-033",
    date: "2025-02-02",
    title: "The Hiker's Burden",
    content: "What are you still carrying that was never meant to be yours?\n\nDaniel loved hiking, but he always carried the same bag—heavy, worn, slowing him down. One day, a champion mountaineer noticed him struggling. 'That's a heavy pack,' the champion said. 'What's in it?' Daniel's hands were shaking. 'It belonged to my best friend, Marcus. We used to hike together. He died on a climb five years ago. So I carry his pack. I hike for both of us now.'\n\n'Have you ever reached a summit?' the champion asked. Daniel looked away. 'No. I always have to turn back. The bag's too heavy.' The champion nodded. 'Marcus didn't want you to carry a bag. He wanted you to reach the top. He wanted someone to stand at the summit. That was the dream. Not the bag.'\n\nDaniel stood there for a long time. He realized Marcus wouldn't want him stuck halfway up mountains, weighed down by guilt disguised as loyalty. He'd want Daniel to fly. With trembling hands, Daniel set the bag down. 'I'm sorry it took me this long,' he whispered. 'But I'm going to finish what we started.' Without the weight, everything felt different. His shoulders didn't ache. His lungs filled deeper. Hours later, when the group reached the summit, Daniel was with them. 'We made it, Marcus. We finally made it.'",
    deepComment: "Letting go isn't betrayal. It's finally being free to reach the top.",
    verse: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders... — Hebrews 12:1",
    theme: "release",
    emotion: "empowering"
  },
  {
    id: "story-034",
    date: "2025-02-03",
    title: "The Prodigal and the Pigs",
    content: "How long do you stay in the pit before you forget you were meant for the palace?\n\nHe'd hit rock bottom. The money was gone. And now he stood in a pigpen, slopping food for animals. At first, he was disgusted. But a week became a month. He got used to the mud. He started naming the pigs. One evening, he thought, 'This isn't so bad. Maybe I could fix the fence. Make this place livable.' He was making peace with the pigs.\n\nAnd that's when it hit him. 'What am I doing?' He stared at his hands—caked in filth. He thought about his father's house. The smell of fresh bread. The warmth of a bed. The dignity of a name. And he whispered, 'I'm a son. My father's servants live better than this.' He looked around the pen—at the pigs he'd named, at the future he'd almost convinced himself was enough. And he started walking.\n\nThe walk was long. His shame was heavy. 'What if he doesn't take me back?' he wondered. He almost turned around. But then he thought about the pigpen. 'I don't know if he'll take me back. But I can't stay in the pen.' He took a step forward. And he didn't look back.",
    deepComment: "Stop making peace with the pit. You were meant for the palace.",
    verse: "When he came to his senses, he said... 'I will set out and go back to my father.' — Luke 15:17-18",
    theme: "repentance",
    emotion: "empowering"
  },
  {
    id: "story-035",
    date: "2025-02-04",
    title: "Mirror vs Window",
    content: "What if the way you see yourself is nothing like the way God sees you?\n\nEvery morning, she stood in front of the mirror. Not out of vanity, but necessity. She scanned her reflection like an inventory. The scar on her cheek. The weight she couldn't lose. The mistakes she couldn't undo. The mirror told her the truth: 'You're not enough. You're broken.'\n\nOne morning she sat on her bed and whispered, 'God, why did You make me like this?' She walked to the window and looked out. And then she noticed her reflection in the glass. Faint. Overlaid on the sunrise. She looked different in the window. Softer. Lighter. Like the version of herself she used to be before shame taught her to hate what she saw.\n\nThe mirror showed her what was—every scar, every failure. But the window showed her what was becoming—something moving, changing, unfinished. She realized the mirror was only showing half the story. The mirror showed the past. The window showed the future. And God wasn't looking at a mirror. He was looking through a window. He didn't see the scar; He saw the story of survival. He didn't see the mistake; He saw the lesson. She whispered, 'Help me see what You see.'",
    deepComment: "Stop staring in the mirror. God's looking through the window.",
    verse: "And we all... are being transformed into his image with ever-increasing glory... — 2 Corinthians 3:18",
    theme: "identity",
    emotion: "peaceful"
  },
  {
    id: "story-036",
    date: "2025-02-05",
    title: "Lost But Found",
    content: "Why would anyone leave 99 to search for one?\n\nThe evening breeze was perfect. Then James came running. 'One of the sheep is missing.' My wife stared at me. 'It's one sheep. You have ninety-nine others. Let it go.' I looked at the horizon. 'I can't.' 'Why not?' She was right—it didn't make logical sense. I just knew: it was mine. I couldn't sleep knowing it was out there alone.\n\nThe search took hours. I walked until my legs ached. Until I started thinking my wife was right. And then I saw it. Standing in a clearing, grazing like it hadn't just caused me a heart attack. I sat down in the grass beside it, exhausted. No signal. I spent the night there. Uncomfortable. Cold. But relieved.\n\nThe next morning, I got home. My wife ran to me. 'You risked your life for one sheep?' I smiled. 'I know.' 'That doesn't make sense.' 'I know.' A few days later, I threw a party. People asked what we were celebrating. 'A few days ago, I lost something. Most people told me to let it go. But I couldn't. So I went looking. And I found it.' It wasn't about the math. It was mine. And that was enough.",
    deepComment: "You're not just one of many. You're the one He searches for.",
    verse: "Suppose one of you has a hundred sheep and loses one of them. Doesn't he leave the ninety-nine... and go after the lost sheep until he finds it? — Luke 15:4-7",
    theme: "worth",
    emotion: "hopeful"
  },
  {
    id: "story-037",
    date: "2025-02-06",
    title: "A Boy or A Girl",
    content: "Do you know what it's like to pray for something so specifically that anything else feels like disappointment?\n\nSarah had been praying the same prayer for months. 'God, please give me a daughter.' She wanted someone to braid hair with. Someone who would understand her. She was the only girl among four brothers. She made a promise: my first will be a girl. Her husband asked, 'What if it's a boy?' She pulled away. 'Don't ask me that.'\n\nScan day arrived. 'Everything looks great,' the technician said. 'You're having a healthy baby boy.' Sarah's stomach dropped. She walked to the car and cried. Ugly, gasping sobs. She felt guilty—so many were praying for any child. But she'd prayed so specifically. And God said no. Her husband texted: 'Thank you for making me a father.' She whispered, 'I'm sorry, God. I'm sorry I'm not grateful enough.'\n\nMonths later, she held her son. He was tiny. Perfect. His little hand wrapped around her finger. And something shifted. She felt deep, overwhelming love. 'I'm sorry I didn't want you at first,' she whispered. A year later her daughter was born. She looked at her son and thought: God didn't ignore my prayer. He just knew better.",
    deepComment: "God's plan doesn't ignore your prayer. It perfects it.",
    verse: "For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord. — Isaiah 55:8-9",
    theme: "trust",
    emotion: "reflective"
  },
  {
    id: "story-038",
    date: "2025-02-07",
    title: "The Man with Two Families",
    content: "How do you forgive someone who rewrote your entire childhood?\n\nLife was full of ups for 26 years. Then it collapsed. Dad returned from a trip. Someone banged on the door. A woman stormed in and slapped him. 'Why weren't you at the wedding? Your daughter waited.' My entire childhood turned into a lie. Dad had another wife, another family. Twenty-five years of hiding.\n\nMom left that day. I haven't heard from her in months. I still live in the same house with him. Every evening I hear him moving upstairs and I feel sick. How do you live two lives for twenty-five years? Every memory is tainted. I want to forgive him, but I don't know how. I carried rage like a stone. I thought bitterness would keep me strong. But it didn't. It just made me tired.\n\nOne night I realized: unforgiveness wasn't punishing him. It was trapping me. The next morning I saw him in the hallway. 'I don't know how to forgive you,' I said. 'But I can't keep carrying this. So I'm letting it go. Not because you deserve it, but because I do.' I walked past him. And for the first time in months, I felt lighter. Peace over revenge. My future over his past.",
    deepComment: "Forgiveness isn't a gift to the person who hurt you. It's freedom for yourself.",
    verse: "Bear with each other and forgive one another... Forgive as the Lord forgave you. — Colossians 3:13",
    theme: "forgiveness",
    emotion: "reflective"
  },
  {
    id: "story-039",
    date: "2025-02-08",
    title: "Twelve Years",
    content: "Have you ever been invisible for so long that being seen feels almost painful?\n\nThe smell came first. That's what people noticed before they saw me. The metallic, sour smell that clung to my clothes no matter how many times I washed them. It announced me before I entered a room. It lingered after I left.\n\nThen came the distance. People stopped sitting close. Then they stopped visiting at all. My husband moved away with the children seven months ago. 'Just until you're better,' he said. But we both knew what that meant.\n\nMy parents loved me. But love from a distance is still distance. I became the woman people whispered about. The one no one touched. The one who learned to disappear in public.\n\nTwelve years. That's how long my body had been bleeding. Twelve years of doctors who promised relief and delivered disappointment. Twelve years of medicines that drained my strength and my savings. Twelve years of hope rising—then collapsing again.\n\nToday I turned forty. It should have been a celebration. Instead, it felt like a quiet burial. By the twelfth year, I'd stopped praying for healing. I only prayed to endure. Then I heard about Him.\n\nHope is dangerous when you've been disappointed this long. Still, something inside me whispered: What if? I wrapped myself carefully and went to where He was teaching. The crowd was thick—bodies pressing, voices loud, dust everywhere.\n\nI pushed through the crowd. My fingers stretched out. Trembling. And then—contact. The fabric brushed my hand. And instantly—the bleeding stopped. Just gone. I froze. My hand still outstretched. Tears streaming. I'm whole.\n\nThen He stopped walking. 'Who touched me?' My stomach dropped. I fell at His feet, shaking, and the words poured out—everything. I waited for anger. Instead, He looked at me. Not past me. Not through me. At me. And He smiled. 'Daughter,' He said softly, 'go in peace. Your faith has made you whole.'\n\nDaughter. I hadn't been called that in twelve years. Not unclean. Not untouchable. Not a burden. Daughter. I knelt there, sobbing, as He placed His hand on my head—gently, like a blessing—and walked on.",
    deepComment: "You're not too far gone. You're one touch away.",
    verse: "Immediately her bleeding stopped and she felt in her body that she was freed from her suffering. — Mark 5:29",
    theme: "healing",
    emotion: "reflective"
  },
  {
    id: "story-040",
    date: "2025-02-09",
    title: "Water into Wine",
    content: "Why would Jesus choose this as His first miracle?\n\nI'd been working weddings for three years. Same routine every time. Fill the cups. Serve the guests. Stay invisible. This one in Cana was louder than most—music, laughter, dancing that went on for hours. The family had clearly saved for this. Everything was perfect. \n\nUntil it wasn't. The head servant pulled me aside, his face pale. 'We're out.' 'Out of what?' 'Wine.' Running out of wine at a wedding wasn't just embarrassing. It was a disaster. The family's name would be ruined. The celebration would be remembered as a failure.\n\nThen I saw her. Mary. The teacher's mother. She was speaking quietly to her son. She walked over to us and said simply, 'Do whatever he tells you.' Jesus walked over to the stone jars. Six of them. Massive. We used them for ceremonial washing—ritual to stay 'clean.' Jesus looked at me and said, 'Fill the jars with water.' 'Water?' 'To the brim.'\n\nSo we filled them. Bucket after bucket. My arms ached and my tunic was soaked. Jesus turned to me. 'Now draw some out and take it to the master of the banquet.' I froze. We'd just poured water into those jars. If I brought water to the master and told him it was wine, I'd be thrown out. But something in His eyes made me obey.\n\nI dipped the cup. Clear liquid. I carried it to the master. He took a sip. Then he stopped. His eyes widened. He called the groom over. 'Everyone serves the best wine first. But you—you saved the best for now.' The groom looked confused. He hadn't ordered more wine.\n\nI stood there, frozen, staring at the cup. I had poured water into that jar. I saw it. I carried it. But what came out... wasn't water. I looked back at Jesus. He was watching me, a slight smile on His face. Not smug. Just... knowing. The other servants crowded around the jars, dipping cups, tasting, faces lighting up in shock. 'It's wine,' one of them whispered.\n\nI stood there for a long time, staring at the stone jars. The same jars we used every day for washing. The same ritual. The same routine. But now they held something I couldn't explain. Something better than what we'd started with.\n\n---\n\nThis miracle wasn’t about impressing a crowd. It was about revealing a heart.\n\nThe stone jars represented the old way—trying to wash yourself clean, trying to be good enough, trying to earn joy through effort and rules. But Jesus didn’t come to improve the ritual. He came to transform it.\n\nWater sustains life. Wine celebrates it. Water is survival. Wine is abundance.\n\nAnd Jesus doesn’t just keep you alive. He brings joy where shame was waiting. He brings celebration where you expected disappointment.\n\nYou may feel ordinary right now. Plain. Spent. Like you’ve run out. But Jesus specializes in moments like that. He doesn’t just refill what’s empty. He transforms it. He saves the best for now.",
    deepComment: "Jesus doesn't just fix what's broken. He transforms it into something better than before.",
    verse: "Jesus said to the servants, 'Fill the jars with water'; so they filled them to the brim. Then he told them, 'Now draw some out and take it to the master of the banquet.' They did so, and the master of the banquet tasted the water that had been turned into wine. — John 2:7-9",
    theme: "transformation",
    emotion: "hopeful"
  },
  {
    id: "story-041",
    date: "2025-02-10",
    title: "The King and the Bandit Prince",
    content: "What happens when you discover you've been living the wrong story?\n\nThe boy was three when they took him. A royal hunt. A moment of chaos—guards distracted, a child wandering too far. And then he was gone. Twenty years later, a man sat in a cell, waiting to die. His name was Kade. The bandits had raised him. Taught him to steal, to fight, to take what he needed. He was good at it. Until the day they caught him.\n\nKade sat in the dark, chains clinking. Then, a figure appeared at the bars. The king. He unlocked the cell door. 'What are you doing?' Kade asked. The king stepped inside. 'You have a scar,' he said. 'On your left shoulder. Shaped like a crescent moon. You were three years old. You fell from a horse. Your mother held you while the physician stitched it.'\n\nKade stared. 'What are you talking about?' The king gripped his shoulders, tears streaming. 'You're my son. You were stolen from me twenty years ago. And now you're here. In my dungeon. About to be executed for crimes you committed because you didn't know who you were.'\n\nKade collapsed. 'I've done terrible things. I've hurt people.' The king knelt beside him. 'You lived the only life you knew. But that's not who you are. You're not defined by what you did in the dark. You're defined by whose blood runs in your veins. You're free. You're coming home.' Kade broke. Sobs tore out of him. The king held him. 'You were always mine.'\n\nHow many of us are living like bandits when we were born as royalty? You're not defined by the survival instincts you built in the forest. The King walked into your cell, saw the chains, and said, 'You're my child. You're free.' Not because you earned it. But because you were always His.",
    deepComment: "You're not defined by what you did in the dark. You're defined by whose blood runs in your veins.",
    verse: "The Spirit you received brought about your adoption to sonship. And by him we cry, 'Abba, Father.' — Romans 8:15",
    theme: "identity",
    emotion: "empowering"
  },
  {
    id: "story-042",
    date: "2025-02-11",
    title: "New Wine, Old Bottle",
    content: "What happens when God wants to give you something new, but you're still holding onto the old?\n\nShe'd been praying for a breakthrough. And then it happened—a dream job in another state. But reality set in. It meant leaving her apartment, her church, her routines. She tried to take the new life while holding onto the old one—subletting the apartment 'just in case,' flying back every weekend. She was exhausted, living in two places at once.\n\nOne night, she broke down. 'Why is everything falling apart?' And in the quiet, she felt it: You can't pour new wine into old bottles. She was trying to fit God's new blessing into her old identity. God wasn't asking her to upgrade her old life. He was giving her a new one. But she had to let go of the container to receive the wine.\n\nThe next morning, she called the movers. No backup plan. It was terrifying, but for the first time, she felt free. The life she was trying to hold onto wasn't big enough for what God was giving her. The old wineskin would've burst. She had to become someone new to carry what He was pouring out.\n\nGod doesn't upgrade your old life. He gives you a new one. But most of us want the blessing without the change. New wine expands. It stretches the container. If the container is rigid, it bursts. Let go of the old container. Trust Him with the new one.",
    deepComment: "You can't pour new wine into old bottles without everything breaking.",
    verse: "No, they pour new wine into new wineskins. — Mark 2:22",
    theme: "transformation",
    emotion: "reflective"
  },
  {
    id: "story-043",
    date: "2025-02-12",
    title: "The Three Genies and the Hidden Treasure",
    content: "Where do you hide something so that no one will ever find it?\n\nThree genies sat in council. The first said, 'Hide happiness at the top of the highest mountain.' The second said, 'No, they always climb.' The third said, 'Hide it on the moon.' The second replied, 'No, they'll build machines. They'll find a way.' Then the second genie's smile widened. 'Hide it inside them. It's the last place they'll look. They'll search the whole world. They'll chase money, power, success. They'll climb mountains and reach for the moon, thinking happiness is something to achieve. But they'll never think to look within.'\n\nAnd so it was decided. Happiness was hidden inside every human being. Always within reach. But most would never find it because they were too busy searching everywhere else. We spend our lives climbing mountains—the promotion, the relationship, the house. We tell ourselves, 'When I get there, I'll finally have peace.' But the peace isn't waiting 'out there.'\n\nThe kingdom of God isn't a destination. It's not something you achieve or acquire. It's something you uncover. It's already inside you. You just have to stop searching long enough to notice.",
    deepComment: "Stop climbing. Stop chasing. The treasure is already within you.",
    verse: "The kingdom of God is in your midst. — Luke 17:20-21",
    theme: "contentment",
    emotion: "reflective"
  },
  {
    id: "story-044",
    date: "2025-02-13",
    title: "The Broken Bucket",
    content: "What if your flaw was never a mistake?\n\nThere was a woman who carried water every morning. She had two buckets—one perfect, one cracked. The perfect bucket was proud, never wasting a drop. But the cracked bucket leaked. By the time the woman reached home, half the water was gone. The cracked bucket was ashamed. 'I'm useless,' it whispered. 'Why not throw me away?'\n\nThe woman smiled. She walked the cracked bucket back along the path. And for the first time, the bucket saw it: vibrant, colorful flowers blooming only on its side of the path. 'I planted seeds here,' the woman said. 'But seeds need water. Every morning, you water them. Look—beauty everywhere you walked. You think your crack makes you useless. But it's the very thing that brings life to this path.'\n\nWe spend so much time hating our cracks—the stutter, the scar, the weakness. We feel like failures. But God doesn't waste your flaws. The thing you leak—the vulnerability, the struggle—it's watering something. Someone is seeing that it's okay to be imperfect and still keep going. Your crack isn't a mistake. It's the way grace gets out.",
    deepComment: "Your flaw isn't a mistake. It's how grace gets out.",
    verse: "My power is made perfect in weakness. — 2 Corinthians 12:9",
    theme: "purpose",
    emotion: "affirming"
  },
  {
    id: "story-045",
    date: "2025-02-14",
    title: "The Chair Nobody Sat In",
    content: "How long do you keep a place set for someone who's never coming back?\n\nThe chair stayed empty for years. At first, no one mentioned it. They just set the table carefully around it—five plates instead of six. No fork. No knife. Just space.\n\nIt belonged to Marcus. The oldest son. The one who left. Not died. Left. There had been arguments. Loud ones. Words that couldn't be taken back. Doors slammed. And then one morning, his room was empty. His car was gone. And the chair at the dinner table became a monument.\n\nEvery Sunday, the family gathered. Mom cooked. Dad carved the roast. The younger kids passed dishes and made small talk. But no one sat in Marcus's chair. It wasn't a rule. No one said, 'Don't sit there.' It just... stayed empty. A silent accusation. A reminder of what was broken. Years passed. The chair collected dust. The family learned to navigate around it, the way you learn to walk around a hole in the floor.\n\nUntil one Sunday evening, there was a knock at the door. Mom opened it. A young man stood there—scraggly, tired, holding a backpack. A friend of a friend. Someone from church who'd mentioned he had nowhere to go for dinner. 'I'm sorry to just show up,' he said. 'But I heard you sometimes have room at your table.'\n\nMom hesitated. Then she smiled. 'Of course. Come in.' She led him to the dining room. The table was set. Five plates. One empty chair. Without thinking, she pulled it out. 'Here. Sit.'\n\nThe young man sat down, grateful, unaware of the weight that chair had carried. And something shifted. The chair no longer accused. It no longer stood as a marker of absence. It held someone. It had purpose again.\n\nLater that night, Mom stood in the doorway staring at the chair. Dad came up beside her. 'I think... I think I've been holding onto the wrong thing,' she whispered. 'I thought keeping his chair empty honored him. Like if I filled it, I'd be saying he didn't matter. But all it did was keep the wound open.' Dad nodded. 'Maybe it was never about Marcus. Maybe it was about us not being ready to let go.'\n\nSome empty spaces aren't meant to remain monuments to loss. Some are invitations. We hold onto absence like it's a form of loyalty. We keep chairs empty thinking that moving forward means forgetting. But God doesn't call us to build shrines to what's gone. He calls us to make space for what's next.",
    deepComment: "Some empty spaces are invitations, not monuments.",
    verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit. — Psalm 34:18",
    theme: "grief",
    emotion: "tender"
  },
  {
    id: "story-046",
    date: "2025-02-15",
    title: "The Mirror That Was Covered",
    content: "What do you do when you can't stand to see yourself?\n\nShe covered every mirror in the house. Bathroom. Bedroom. Hallway. Fabric draped carefully over each one, like she was protecting herself from something dangerous. Her reflection carried too many memories. Too many mistakes. Too much shame. She couldn't look at herself without hearing the voices. 'You're not enough. You're too much. You're broken.'\n\nOne morning, she sat in her room reading Scripture. Then a breeze came through the window and knocked the cloth off the mirror across from her bed. She flinched. But something made her look back. The face staring at her wasn't what she expected. It wasn't condemned. It wasn't monstrous. It was tired. Worn. But still breathing. Still here.\n\nShe stared at herself for the first time in months. And she realized: God had been looking at her this whole time. While she hid. While she covered the mirrors. He never looked away. Not once. Not when she made the mistakes. Not when she carried the shame. He saw her. Fully. And He didn't flinch. Tears streamed down her face. 'You've been here the whole time, haven't you?'\n\nShe stood up slowly and touched the glass. 'I'm still here,' she whispered. And for the first time in a long time, that felt like enough. Over the next few weeks, she uncovered the other mirrors. One by one. Each time she looked, she practiced something new: seeing herself the way God saw her. Not perfect. Not polished. But loved. Seen. Held.\n\nWe hide from mirrors because we believe the worst thing about us is what defines us. But God doesn't define you by your worst moment. He defines you by His love. You think you're too broken to be seen. He says you're too loved to stay hidden.",
    deepComment: "God never looks away. Even when you can't stand to look at yourself.",
    verse: "And we all, who with unveiled faces contemplate the Lord's glory, are being transformed into his image with ever-increasing glory. — 2 Corinthians 3:18",
    theme: "identity",
    emotion: "healing"
  },
  {
    id: "story-047",
    date: "2025-02-16",
    title: "The Locked Door",
    content: "What room in your heart have you kept locked for years?\n\nThere was one room in the house no one entered. The door stayed shut. Paint peeling. Something had happened there. It was her father's office. The place where he used to work late, the place where she'd knock softly, hoping tonight he'd let her in. But he always yelled. And then one night, he just stopped. Heart attack. She was seventeen. Now she was thirty-two. And the door was still locked.\n\nOne night, she couldn't sleep. She walked downstairs and stared at the door. Fifteen years of walking past it. She reached for the handle. Her hand trembled. 'What if it's worse than I remember?' Then, quietly: 'I'm already in there.' She froze. 'I've been in that room the whole time. Waiting.' She took a breath. Turned the handle. The door opened.\n\nThe room was exactly as she remembered. Desk. Chair. But it didn't feel the same. The air didn't feel heavy. She stepped inside and she felt it—presence. Not her father's ghost. Not the weight of the past. Jesus. He'd been in this room the whole time. In the place she'd locked away. In the trauma she couldn't face. He'd been there. Waiting. Gentle. Patient. She sank into the chair and wept. Not out of pain. Out of relief.\n\nShe didn't clean out the room that night. But she left the door open. Just a crack. Just enough to let light in. Over the next few months, she went back. And each time, the room felt a little less like a tomb and a little more like a place she could breathe. There are rooms in our hearts we keep locked because we think the pain will destroy us. But Jesus doesn't break down the door. He knocks. And when you finally let Him in, you realize: He was already there.",
    deepComment: "Jesus doesn't force the door open. He waits. And when you're ready, He walks in with you.",
    verse: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in. — Revelation 3:20",
    theme: "healing",
    emotion: "tender"
  },
  {
    id: "story-048",
    date: "2025-02-17",
    title: "The Spare Key",
    content: "How long do you wait for someone who might never come home?\n\nHe kept the spare key. Even after the locks had been changed. Even after his friends said, 'You need to let go.' The key sat on a hook by the front door. It belonged to his son. Daniel. Gone for five years. There had been fights. One night, Daniel said, 'I don't need you.' And he left. No goodbye. Just gone.\n\nThe third year, people started saying, 'You have to move on. He's not coming back.' But he couldn't. Because Daniel was still his son. And sons come home. Eventually. 'Why keep it?' his neighbor asked. 'The locks are different.' The father smiled sadly. 'Because it's not about the key. It means the door is always open. It means I'm still his father. And he's still welcome home.'\n\nFive years became seven. And then, one night, there was a knock at the door. Daniel stood there. Thinner. Exhausted. 'Dad, I'm sorry. I messed up. I don't deserve—' 'Stop,' his father whispered, pulling him into his arms. 'You're home. That's all that matters.' Daniel sobbed. 'I thought you'd be done with me.' The father pulled back: 'I kept the key, didn't I?'\n\nGod keeps a key for you. Even when you've changed the locks. Even when you've burned every bridge. He's still on the porch. Still scanning the road. Covenant love doesn't give up. It doesn't throw away the key just because the door hasn't opened yet. He's waiting. Out of love. And when you finally come home, He won't ask where you've been. He'll just say, 'You're home.'",
    deepComment: "God keeps the key. Even when you've changed the locks.",
    verse: "I will heal their waywardness and love them freely, for my anger has turned away from them. — Hosea 14:4",
    theme: "faithfulness",
    emotion: "hopeful"
  }
];

// 🎯 HELPER FUNCTIONS (No more cycling - sequential progress based on user join date)

let currentUserDay = 1;

/**
 * Sets the current day for the user based on their install date.
 * Should be called from the app root/layout on start.
 * @param day The day number (1-indexed)
 */
export function setUserDay(day: number) {
  currentUserDay = Math.max(1, day);
  console.log(`[CONTENT] User day set to: ${currentUserDay}`);
}

// Get today's story (sequential based on user progress)
export function getTodaysStory(): Story {
  const index = (currentUserDay - 1) % dailyStories.length;
  return dailyStories[index];
}

// Get story by day number (1-indexed)
export function getStoryByDay(dayNumber: number): Story | null {
  if (dayNumber < 1 || dayNumber > dailyStories.length) return null;
  return dailyStories[dayNumber - 1];
}

// Get today's morning whisper (sequential, no repeat)
export function getTodaysMorningWhisper(): MorningWhisper {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = (dayOfYear - 1) % morningWhispers.length;
  return morningWhispers[index];
}

// Get morning whisper by day number (1-indexed)
export function getMorningWhisperByDay(dayNumber: number): MorningWhisper | null {
  if (dayNumber < 1 || dayNumber > morningWhispers.length) return null;
  return morningWhispers[dayNumber - 1];
}

// Get today's night whisper (sequential, no repeat)
export function getTodaysNightWhisper(): NightWhisper {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = (dayOfYear - 1) % nightWhispers.length;
  return nightWhispers[index];
}

// Get night whisper by day number (1-indexed)
export function getNightWhisperByDay(dayNumber: number): NightWhisper | null {
  if (dayNumber < 1 || dayNumber > nightWhispers.length) return null;
  return nightWhispers[dayNumber - 1];
}

// Get all stories (for library - Partner feature)
export function getAllStories(): Story[] {
  return dailyStories;
}

// Get stories by theme (for library filtering)
export function getStoriesByTheme(theme: string): Story[] {
  return dailyStories.filter(story => story.theme === theme);
}

// Get stories by emotion (for library filtering)
export function getStoriesByEmotion(emotion: string): Story[] {
  return dailyStories.filter(story => story.emotion === emotion);
}

// Get all morning whispers
export function getAllMorningWhispers(): MorningWhisper[] {
  return morningWhispers;
}

// Get all night whispers
export function getAllNightWhispers(): NightWhisper[] {
  return nightWhispers;
}

// Get total counts
export function getContentCounts() {
  return {
    stories: dailyStories.length,
    morningWhispers: morningWhispers.length,
    nightWhispers: nightWhispers.length,
    total: dailyStories.length + morningWhispers.length + nightWhispers.length
  };
}

export default {
  dailyStories,
  morningWhispers,
  nightWhispers,
  getTodaysStory,
  getStoryByDay,
  getTodaysMorningWhisper,
  getMorningWhisperByDay,
  getTodaysNightWhisper,
  getNightWhisperByDay,
  getAllStories,
  getStoriesByTheme,
  getStoriesByEmotion,
  getAllMorningWhispers,
  getAllNightWhispers,
  getContentCounts
};