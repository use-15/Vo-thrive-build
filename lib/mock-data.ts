export interface Habit {
  id: string
  title: string
  description: string
  completed: boolean
  streak: number
  category: "fitness" | "mindfulness" | "nutrition" | "sleep"
  emoji: string
}

export interface ContentItem {
  id: string
  slug: string
  title: string
  description: string
  category: "meditation" | "workouts" | "nutrition" | "sleep" | "mindfulness"
  type: "article" | "video" | "audio"
  thumbnail: string
  duration?: string
  author: string
  publishedAt: string
  content?: string
  videoUrl?: string
  audioUrl?: string
}

export const mockHabits: Habit[] = [
  {
    id: "1",
    title: "Morning Meditation",
    description: "10 minutes of mindfulness practice",
    completed: true,
    streak: 7,
    category: "mindfulness",
    emoji: "🧘",
  },
  {
    id: "2",
    title: "Drink Water",
    description: "8 glasses throughout the day",
    completed: true,
    streak: 12,
    category: "nutrition",
    emoji: "💧",
  },
  {
    id: "3",
    title: "Evening Walk",
    description: "30 minutes of light exercise",
    completed: false,
    streak: 5,
    category: "fitness",
    emoji: "🚶",
  },
  {
    id: "4",
    title: "Read Before Bed",
    description: "15 minutes of reading",
    completed: true,
    streak: 3,
    category: "sleep",
    emoji: "📚",
  },
  {
    id: "5",
    title: "Gratitude Journal",
    description: "Write 3 things you're grateful for",
    completed: false,
    streak: 8,
    category: "mindfulness",
    emoji: "📝",
  },
]

export const mockContent: ContentItem[] = [
  {
    id: "1",
    slug: "morning-meditation-guide",
    title: "The Complete Guide to Morning Meditation",
    description: "Start your day with clarity and focus through this comprehensive meditation guide.",
    category: "meditation",
    type: "article",
    thumbnail: "/peaceful-morning-meditation.png",
    author: "Dr. Sarah Chen",
    publishedAt: "2024-01-15",
    content: `# The Complete Guide to Morning Meditation

Morning meditation is one of the most powerful ways to start your day. It sets a positive tone, reduces stress, and improves focus throughout the day.

## Benefits of Morning Meditation

- **Improved Focus**: Starting your day with meditation helps clear mental clutter
- **Reduced Stress**: Regular practice lowers cortisol levels
- **Better Emotional Regulation**: Helps you respond rather than react to challenges
- **Enhanced Creativity**: A calm mind is more open to new ideas

## Getting Started

### 1. Choose Your Space
Find a quiet corner in your home where you won't be disturbed. It doesn't need to be large - just comfortable and peaceful.

### 2. Start Small
Begin with just 5 minutes. As you build the habit, you can gradually increase the duration.

### 3. Focus on Your Breath
Simply observe your natural breathing pattern. When your mind wanders, gently bring attention back to your breath.

## Common Challenges

**"I don't have time"**: Even 3-5 minutes can make a difference. Wake up just a few minutes earlier.

**"My mind is too busy"**: This is normal! The goal isn't to stop thoughts, but to observe them without judgment.

**"I keep forgetting"**: Set a reminder on your phone or place a meditation cushion somewhere visible.

## Building the Habit

Consistency is more important than duration. It's better to meditate for 5 minutes every day than 30 minutes once a week.

Remember, meditation is a practice. Be patient with yourself as you develop this life-changing habit.`,
  },
  {
    id: "2",
    slug: "hiit-workout-beginners",
    title: "15-Minute HIIT Workout for Beginners",
    description: "High-intensity interval training that you can do anywhere, no equipment needed.",
    category: "workouts",
    type: "video",
    thumbnail: "/hiit-workout-home.png",
    duration: "15 min",
    author: "Mike Rodriguez",
    publishedAt: "2024-01-12",
    videoUrl: "https://example.com/hiit-workout.mp4",
    content: "This beginner-friendly HIIT workout combines cardio and strength training in just 15 minutes.",
  },
  {
    id: "3",
    slug: "healthy-meal-prep-sunday",
    title: "Meal Prep Sunday: 5 Healthy Recipes",
    description: "Prepare a week's worth of nutritious meals in just 2 hours.",
    category: "nutrition",
    type: "article",
    thumbnail: "/healthy-meal-prep.png",
    author: "Chef Maria Santos",
    publishedAt: "2024-01-10",
    content: `# Meal Prep Sunday: 5 Healthy Recipes

Meal prepping is a game-changer for maintaining healthy eating habits throughout the week. Here are 5 delicious and nutritious recipes you can prepare in advance.

## Recipe 1: Mediterranean Quinoa Bowl

**Ingredients:**
- 1 cup quinoa
- Cherry tomatoes
- Cucumber
- Red onion
- Feta cheese
- Olive oil
- Lemon juice

**Instructions:**
1. Cook quinoa according to package directions
2. Chop vegetables
3. Combine all ingredients
4. Store in containers for up to 5 days

## Recipe 2: Asian-Inspired Chicken Stir Fry

A protein-packed meal with colorful vegetables and a savory sauce.

## Recipe 3: Overnight Oats (3 Ways)

Perfect for busy mornings - just grab and go!

## Recipe 4: Roasted Vegetable and Hummus Wrap

A satisfying vegetarian option loaded with nutrients.

## Recipe 5: Baked Salmon with Sweet Potato

Omega-3 rich salmon paired with fiber-rich sweet potatoes.

## Meal Prep Tips

- Invest in quality glass containers
- Prep ingredients separately for maximum freshness
- Label everything with dates
- Start small - prep just 3 days worth initially`,
  },
  {
    id: "4",
    slug: "sleep-meditation-podcast",
    title: "Deep Sleep Meditation",
    description: "A guided meditation to help you fall asleep peacefully and wake up refreshed.",
    category: "sleep",
    type: "audio",
    thumbnail: "/peaceful-bedroom.png",
    duration: "20 min",
    author: "Luna Williams",
    publishedAt: "2024-01-08",
    audioUrl: "https://example.com/sleep-meditation.mp3",
    content:
      "This guided sleep meditation uses progressive muscle relaxation and breathing techniques to help you drift off naturally.",
  },
  {
    id: "5",
    slug: "mindful-eating-practices",
    title: "Mindful Eating: Transform Your Relationship with Food",
    description: "Learn how to eat with intention and attention for better health and satisfaction.",
    category: "mindfulness",
    type: "article",
    thumbnail: "/mindful-eating.png",
    author: "Dr. James Park",
    publishedAt: "2024-01-05",
    content: `# Mindful Eating: Transform Your Relationship with Food

Mindful eating is about being fully present during meals, paying attention to the experience of eating, and listening to your body's hunger and fullness cues.

## What is Mindful Eating?

Mindful eating involves:
- Eating slowly and without distraction
- Listening to physical hunger cues
- Distinguishing between true hunger and non-hunger triggers
- Engaging your senses by noticing colors, smells, sounds, textures, and flavors
- Learning to cope with guilt and anxiety about food
- Eating to maintain overall health and well-being

## Benefits

- **Better Digestion**: Eating slowly aids digestion
- **Weight Management**: Helps recognize fullness cues
- **Reduced Stress**: Creates a calmer relationship with food
- **Enhanced Enjoyment**: Food tastes better when you're present

## How to Practice Mindful Eating

### Before You Eat
- Check in with your hunger level (1-10 scale)
- Remove distractions (TV, phone, computer)
- Take three deep breaths

### During Your Meal
- Eat slowly and chew thoroughly
- Put your fork down between bites
- Notice flavors, textures, and aromas
- Check in with fullness halfway through

### After Eating
- Notice how you feel physically and emotionally
- Express gratitude for your meal
- Avoid judgment about your eating choices

## Common Challenges

**Eating too fast**: Set a timer for 20 minutes minimum per meal

**Distractions**: Create a designated eating space free from screens

**Emotional eating**: Practice the HALT check (Hungry, Angry, Lonely, Tired)

Remember, mindful eating is a practice. Be patient and compassionate with yourself as you develop this skill.`,
  },
  {
    id: "6",
    slug: "yoga-flow-morning-energy",
    title: "10-Minute Morning Yoga Flow",
    description: "Energizing yoga sequence to wake up your body and mind.",
    category: "workouts",
    type: "video",
    thumbnail: "/yoga-morning-sunlight.png",
    duration: "10 min",
    author: "Yoga Instructor Emma",
    publishedAt: "2024-01-03",
    videoUrl: "https://example.com/morning-yoga.mp4",
    content:
      "Start your day with this gentle yet energizing yoga flow designed to awaken your body and center your mind.",
  },
]

export const weeklyProgressData = [
  { day: "Mon", completed: 4, total: 5 },
  { day: "Tue", completed: 5, total: 5 },
  { day: "Wed", completed: 3, total: 5 },
  { day: "Thu", completed: 4, total: 5 },
  { day: "Fri", completed: 5, total: 5 },
  { day: "Sat", completed: 2, total: 5 },
  { day: "Sun", completed: 3, total: 5 },
]
