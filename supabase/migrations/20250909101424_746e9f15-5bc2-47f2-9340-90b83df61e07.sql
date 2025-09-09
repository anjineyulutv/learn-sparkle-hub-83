-- Create a seeder function that properly handles posts with auth
CREATE OR REPLACE FUNCTION public.seed_demo_posts()
RETURNS void AS $$
DECLARE
    demo_user_id uuid;
BEGIN
    -- First, create or get a demo user profile
    INSERT INTO public.profiles (user_id, username, display_name, bio)
    VALUES (
        '00000000-0000-0000-0000-000000000001'::uuid,
        'anjineyulu',
        'Anjineyulu',
        'Community Builder & AI Enthusiast'
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    demo_user_id := '00000000-0000-0000-0000-000000000001'::uuid;
    
    -- Clear existing demo posts first
    DELETE FROM public.posts WHERE author_id = demo_user_id;
    
    -- Insert all demo posts
    INSERT INTO public.posts (author_id, content, post_type, category, tags, likes_count, replies_count, shares_count, created_at) VALUES
    (demo_user_id, '🚀 Hiring an intern/contractor! I''m hiring for a short term project in Applied AI. Must haves: - Experience with Instructor/Structured output generation from LLMs. - Experience with prompting LLMs by understanding Biz outcomes. - Knowing or ready to pickup LiteLLM or Gateway by Portkey. How to apply: email your best GenAI project at rachitt01@gmail.com', 'text', '🚀 Hiring/Internship Opportunity', ARRAY['hiring', 'AI', 'internship', 'LLM'], 5, 2, 1, NOW() - INTERVAL '1 hour'),
    
    (demo_user_id, '💡 POLL: How many have cleared JEE Mains (general cutoff)? This helps when I speak to founders. No bias if you haven''t - I understand coaching is expensive. Let''s focus on skills and passion! 📊 Results: Yes (12 votes), No (1 vote)', 'question', '💡 AI/ML Update', ARRAY['poll', 'JEE', 'community'], 15, 8, 3, NOW() - INTERVAL '2 hours'),
    
    (demo_user_id, '🚀 Congratulations to everyone who got internships this semester! @PayPal intern and others - proud of your achievements! For others, remember: அடிமேல் அடி அடித்தால் அம்மியும் நகரும் (Persistent effort moves even the stone). Keep pushing!', 'achievement', '🚀 Hiring/Internship Opportunity', ARRAY['congratulations', 'internships', 'motivation'], 18, 12, 6, NOW() - INTERVAL '3 hours'),
    
    (demo_user_id, '🤖 Creative AI is making waves! A meme creating AI SaaS made $100k with just 3 founders. Check out SuperMeme.ai - it''s incredibly good at creating contextual memes with perfect semantics. Think of it as raising the bar for meme creators, not replacing them!', 'text', '🤖 Creative AI in Action', ARRAY['AI', 'creative', 'SaaS', 'memes'], 8, 4, 2, NOW() - INTERVAL '4 hours'),
    
    (demo_user_id, '📚 Deep Learning Interview Book - Essential reading for anyone preparing for AI/ML interviews. Also sharing some exciting updates about Freshworks founder Girish Mathrubootham and early startup investments. The entrepreneurial ecosystem is thriving!', 'text', '📚 RAG & AI Copilots', ARRAY['deep-learning', 'interviews', 'startups'], 12, 6, 4, NOW() - INTERVAL '5 hours'),
    
    (demo_user_id, '🚀 Cuebo.ai is hiring 2 interns! They build tools for sales teams and are growing fast. Work with text/audio data, LLMs, NLP models. Requirements: Python, Git, LLMs/NLP experience is a plus. Minimum 3 month commitment, potential full-time conversion.', 'text', '🚀 Hiring/Internship Opportunity', ARRAY['Cuebo', 'sales-tools', 'NLP', 'Python'], 10, 5, 3, NOW() - INTERVAL '6 hours'),
    
    (demo_user_id, '💡 Network is terrible due to cyclone 😭 Trying to sustain on mobile data. Community support during natural disasters shows our resilience. Thanks everyone for understanding the connectivity issues during our calls!', 'text', '💡 AI/ML Update', ARRAY['cyclone', 'network', 'community', 'support'], 4, 8, 1, NOW() - INTERVAL '7 hours'),
    
    (demo_user_id, '🎯 Just finished reviewing 50+ resumes for our AI internship program. Key observations: 1) GitHub portfolio matters more than grades, 2) Personal projects show passion, 3) Clear communication in README files = attention to detail. Keep building! 💪', 'text', '💼 Career Tips', ARRAY['resume', 'portfolio', 'internship', 'advice'], 22, 15, 8, NOW() - INTERVAL '8 hours'),
    
    (demo_user_id, '🧠 AI Fact: GPT models don''t actually "understand" like humans do - they predict the most probable next token based on patterns. Yet the emergent behavior looks remarkably intelligent. Makes you wonder about the nature of intelligence itself! 🤔', 'text', '🤖 AI Insights', ARRAY['AI', 'GPT', 'intelligence', 'philosophy'], 31, 18, 12, NOW() - INTERVAL '9 hours'),
    
    (demo_user_id, '📊 Poll Results: "What''s your biggest challenge in AI/ML?" 🥇 Data Quality (40%) 🥈 Model Deployment (30%) 🥉 Computing Resources (20%) Others (10%). Data quality remains the silent killer of ML projects. Focus on clean, representative data first!', 'question', '📊 Community Insights', ARRAY['poll', 'data-quality', 'ML', 'challenges'], 27, 21, 9, NOW() - INTERVAL '10 hours'),
    
    (demo_user_id, '🎉 Milestone Alert! Our AI community just hit 1000+ members! From 50 students discussing basic concepts to a thriving ecosystem of builders, researchers, and industry professionals. Thank you all for making this journey incredible! 🚀', 'achievement', '🎉 Community Growth', ARRAY['milestone', 'community', '1000-members', 'gratitude'], 45, 32, 18, NOW() - INTERVAL '11 hours'),
    
    (demo_user_id, '💰 Startup Funding Alert: AI companies raised $50B+ in 2024. But here''s the catch - 80% went to foundation model companies. For the rest of us building applications: focus on solving real problems, not chasing hype. Value > Valuation! 📈', 'text', '💰 Startup Ecosystem', ARRAY['funding', 'startups', 'AI-market', 'advice'], 19, 11, 7, NOW() - INTERVAL '12 hours'),
    
    (demo_user_id, '🔬 Research Paper Recommendation: "Attention Is All You Need" - still relevant 7 years later! If you''re serious about understanding modern AI, this is your starting point. Link in bio. Who''s up for a paper reading session this weekend? 📖', 'text', '📚 Research Corner', ARRAY['research', 'transformers', 'attention', 'paper-reading'], 34, 25, 14, NOW() - INTERVAL '13 hours'),
    
    (demo_user_id, '🛠️ Tool Tuesday: Just discovered Weights & Biases (wandb) for experiment tracking. Game changer! No more spreadsheets for tracking model performance. Clean dashboards, automatic logging, team collaboration. Highly recommend for ML projects! 🎯', 'text', '🛠️ Tools & Resources', ARRAY['tools', 'wandb', 'ML-ops', 'experiment-tracking'], 28, 16, 11, NOW() - INTERVAL '14 hours'),
    
    (demo_user_id, '🎪 Fun Friday: Asked ChatGPT to explain quantum computing using only food analogies. The result was surprisingly good! "Superposition is like Schrödinger''s pizza - it''s both vegetarian and non-vegetarian until you open the box" 🍕⚛️', 'text', '🎪 Fun Learning', ARRAY['quantum-computing', 'analogies', 'ChatGPT', 'fun'], 42, 28, 16, NOW() - INTERVAL '15 hours'),
    
    (demo_user_id, '🌟 Student Spotlight: Priya built an AI-powered study planner that adapts to learning patterns. Got her an internship at Microsoft! Key lesson: Don''t just follow tutorials, solve problems you personally face. That''s where innovation begins! 👩‍💻', 'achievement', '🌟 Success Stories', ARRAY['student-spotlight', 'innovation', 'Microsoft', 'inspiration'], 38, 22, 13, NOW() - INTERVAL '16 hours'),
    
    (demo_user_id, '⚡ Quick Tip: When debugging ML models, always check these 3 things first: 1) Data leakage in features, 2) Train/validation split consistency, 3) Label distribution balance. Saved me hours of headaches! What''s your go-to debugging checklist? 🐛', 'text', '⚡ Quick Tips', ARRAY['debugging', 'ML', 'tips', 'troubleshooting'], 33, 19, 10, NOW() - INTERVAL '17 hours'),
    
    (demo_user_id, '🎓 Learning Path Question: "Should I learn TensorFlow or PyTorch first?" My take: PyTorch for research/experimentation, TensorFlow for production. But honestly, concepts matter more than frameworks. Master the math, libraries become tools! 🧮', 'question', '🎓 Learning Guidance', ARRAY['learning-path', 'TensorFlow', 'PyTorch', 'frameworks'], 29, 17, 8, NOW() - INTERVAL '18 hours'),
    
    (demo_user_id, '🚨 Reality Check: "Will AI take my job?" Better question: "How can I work WITH AI to become irreplaceable?" Saw a designer use Midjourney + human creativity to 10x output quality. Adaptation > Resistance! 🤝', 'text', '🚨 Future of Work', ARRAY['AI-jobs', 'adaptation', 'creativity', 'human-AI'], 41, 24, 15, NOW() - INTERVAL '19 hours'),
    
    (demo_user_id, '📱 App Idea Validation: Building an AI tutor that explains concepts in your learning style (visual, auditory, kinesthetic). Market research shows 73% students struggle with one-size-fits-all education. Thoughts? 🤖👨‍🎓', 'question', '📱 Product Ideas', ARRAY['app-idea', 'AI-tutor', 'education', 'personalization'], 26, 20, 9, NOW() - INTERVAL '20 hours'),
    
    (demo_user_id, '🏆 Competition Alert: Google AI Challenge 2025 applications open! $100k prize pool, mentorship from Googlers, potential job offers. Theme: "AI for Social Good". Perfect for students wanting to make impact + advance careers. Link in comments! 🎯', 'text', '🏆 Opportunities', ARRAY['competition', 'Google', 'AI-challenge', 'social-good'], 37, 26, 17, NOW() - INTERVAL '21 hours'),
    
    (demo_user_id, '🔥 Hot Take: The best AI engineers I know spend 60% time on data, 30% on models, 10% on deployment. Yet most courses teach the opposite ratio. Data engineering skills are severely undervalued in AI education! 📊', 'text', '🔥 Industry Insights', ARRAY['data-engineering', 'AI-education', 'skills', 'hot-take'], 35, 23, 12, NOW() - INTERVAL '22 hours'),
    
    (demo_user_id, '💡 Weekend Project Idea: Build a "Code Review AI" that explains what your code does in plain English. Great for beginners to understand their own code better + impressive portfolio piece. Who''s building this with me? 🤝', 'text', '💡 Project Ideas', ARRAY['weekend-project', 'code-review', 'AI', 'collaboration'], 30, 18, 11, NOW() - INTERVAL '23 hours'),
    
    (demo_user_id, '🎨 Creative Corner: Used DALL-E to generate concept art for a sci-fi story about AI consciousness. The images sparked plot ideas I never would have thought of! AI as a creative collaborator, not replacement. Art + Tech = Magic ✨', 'text', '🎨 Creative AI', ARRAY['DALL-E', 'creative-collaboration', 'sci-fi', 'art-tech'], 24, 14, 6, NOW() - INTERVAL '24 hours'),
    
    (demo_user_id, '🎯 Year-End Reflection: Started 2024 knowing basic Python, ending it with 3 deployed ML models and a job offer. Key lessons: 1) Build in public, 2) Join communities, 3) Embrace failure as learning. 2025, here we come! 🚀', 'achievement', '🎯 Personal Growth', ARRAY['year-end', 'reflection', 'growth', 'job-offer'], 52, 34, 21, NOW() - INTERVAL '25 hours');
END;
$$ LANGUAGE plpgsql;