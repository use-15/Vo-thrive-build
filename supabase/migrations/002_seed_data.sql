-- Insert sample content
INSERT INTO public.content (slug, title, description, content, category, type, thumbnail_url, author, is_published, published_at) VALUES
(
    'morning-meditation-guide',
    'The Complete Guide to Morning Meditation',
    'Start your day with clarity and focus through this comprehensive meditation guide.',
    '# The Complete Guide to Morning Meditation

Morning meditation is one of the most powerful ways to start your day. It sets a positive tone, reduces stress, and improves focus throughout the day.

## Benefits of Morning Meditation

- **Improved Focus**: Starting your day with meditation helps clear mental clutter
- **Reduced Stress**: Regular practice lowers cortisol levels
- **Better Emotional Regulation**: Helps you respond rather than react to challenges
- **Enhanced Creativity**: A calm mind is more open to new ideas

## Getting Started

### 1. Choose Your Space
Find a quiet corner in your home where you won''t be disturbed. It doesn''t need to be large - just comfortable and peaceful.

### 2. Start Small
Begin with just 5 minutes. As you build the habit, you can gradually increase the duration.

### 3. Focus on Your Breath
Simply observe your natural breathing pattern. When your mind wanders, gently bring attention back to your breath.',
    'meditation',
    'article',
    '/peaceful-morning-meditation.png',
    'Dr. Sarah Chen',
    true,
    NOW()
),
(
    'hiit-workout-beginners',
    '15-Minute HIIT Workout for Beginners',
    'High-intensity interval training that you can do anywhere, no equipment needed.',
    'This beginner-friendly HIIT workout combines cardio and strength training in just 15 minutes.',
    'workouts',
    'video',
    '/hiit-workout-home.png',
    'Mike Rodriguez',
    true,
    NOW()
),
(
    'healthy-meal-prep-sunday',
    'Meal Prep Sunday: 5 Healthy Recipes',
    'Prepare a week''s worth of nutritious meals in just 2 hours.',
    '# Meal Prep Sunday: 5 Healthy Recipes

Meal prepping is a game-changer for maintaining healthy eating habits throughout the week.',
    'nutrition',
    'article',
    '/healthy-meal-prep.png',
    'Chef Maria Santos',
    true,
    NOW()
),
(
    'sleep-meditation-podcast',
    'Deep Sleep Meditation',
    'A guided meditation to help you fall asleep peacefully and wake up refreshed.',
    'This guided sleep meditation uses progressive muscle relaxation and breathing techniques.',
    'sleep',
    'audio',
    '/peaceful-bedroom.png',
    'Luna Williams',
    true,
    NOW()
),
(
    'mindful-eating-practices',
    'Mindful Eating: Transform Your Relationship with Food',
    'Learn how to eat with intention and attention for better health and satisfaction.',
    '# Mindful Eating: Transform Your Relationship with Food

Mindful eating is about being fully present during meals.',
    'mindfulness',
    'article',
    '/mindful-eating.png',
    'Dr. James Park',
    true,
    NOW()
);
