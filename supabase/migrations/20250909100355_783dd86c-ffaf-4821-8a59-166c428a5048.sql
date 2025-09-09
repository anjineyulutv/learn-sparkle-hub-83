-- Let's check if there are any existing users and create posts with a simple approach
-- We'll create posts but temporarily bypass the profile foreign key constraint

-- First, let's see if we can create posts directly with a simple user reference
-- We'll insert posts with a generic author_id that can be updated later when users sign up

INSERT INTO public.posts (author_id, content, category, tags, post_type, created_at, likes_count) VALUES
('00000000-0000-0000-0000-000000000000', '🚀 Hiring an intern/contractor! I''m hiring for a short term project in Applied AI. Must haves: - Experience with Instructor/Structured output generation from LLMs. - Experience with prompting LLMs by understanding Biz outcomes. - Knowing or ready to pickup LiteLLM or Gateway by Portkey. How to apply: email your best GenAI project at rachitt01@gmail.com', '🚀 Hiring/Internship Opportunity', ARRAY['hiring', 'AI', 'internship', 'LLM'], 'text', NOW() - INTERVAL '1 hour', 5),

('00000000-0000-0000-0000-000000000000', '🤖 That''s exactly what they said in school😂 Creative AI is making waves! A meme creating AI SaaS made $100k with just 3 founders. Check out SuperMeme.ai - it''s incredibly good at creating contextual memes with perfect semantics. Think of it as raising the bar for meme creators, not replacing them!', '🤖 Creative AI in Action', ARRAY['AI', 'creative', 'SaaS', 'memes'], 'text', NOW() - INTERVAL '2 hours', 8),

('00000000-0000-0000-0000-000000000000', '📚 Deep Learning Interview Book - Essential reading for anyone preparing for AI/ML interviews. Also sharing some exciting updates about Freshworks founder Girish Mathrubootham and early startup investments. The entrepreneurial ecosystem is thriving!', '📚 RAG & AI Copilots', ARRAY['deep-learning', 'interviews', 'startups'], 'text', NOW() - INTERVAL '3 hours', 12),

('00000000-0000-0000-0000-000000000000', '🚀 Kothari Fellowship applications are open! Please apply at kotharifellowship.com. Also, job posting for Fresher AI Creative at Gobo Labs - looking for passionate individuals with prompt engineering skills and ComfyUI familiarity. Send resume to production@gobolabs.in', '🚀 Hiring/Internship Opportunity', ARRAY['fellowship', 'AI', 'creative', 'GoboLabs'], 'text', NOW() - INTERVAL '4 hours', 7),

('00000000-0000-0000-0000-000000000000', '💡 POLL: How many have cleared JEE Mains (general cutoff)? This helps when I speak to founders. No bias if you haven''t - I understand coaching is expensive. Let''s focus on skills and passion! 📊 Results: Yes (12 votes), No (1 vote)', '💡 AI/ML Update', ARRAY['poll', 'JEE', 'community'], 'question', NOW() - INTERVAL '5 hours', 15),

('00000000-0000-0000-0000-000000000000', '🚀 Internship opportunity for LLM evaluation and POCs! Paid ₹15k. Looking for people comfortable with Hugging Face models and quick demos. Contact details: LinkedIn profile of Chitra Gozeal. Great opportunity for hands-on AI experience!', '🚀 Hiring/Internship Opportunity', ARRAY['internship', 'LLM', 'evaluation', 'HuggingFace'], 'text', NOW() - INTERVAL '6 hours', 9),

('00000000-0000-0000-0000-000000000000', '💡 Azure''s advanced AI search capabilities are impressive! Also sharing that exams are ongoing, so please be patient with resume submissions. When does the semester end? We''ll coordinate better post-exams.', '💡 AI/ML Update', ARRAY['Azure', 'AI', 'search', 'exams'], 'text', NOW() - INTERVAL '7 hours', 6),

('00000000-0000-0000-0000-000000000000', '🚀 Congratulations to everyone who got internships this semester! @PayPal intern and others - proud of your achievements! For others, remember: அடிமேல் அடி அடித்தால் அம்மியும் நகரும் (Persistent effort moves even the stone). Keep pushing!', '🚀 Hiring/Internship Opportunity', ARRAY['congratulations', 'internships', 'motivation'], 'achievement', NOW() - INTERVAL '8 hours', 18),

('00000000-0000-0000-0000-000000000000', '💡 Fantastic work on the linear regression Colab by Varshitha! Check out the implementation: https://colab.research.google.com/drive/1GvRopmOpCsxpaUIUOLCl8OWqaa5gtsjX?usp=sharing. Great learning resource for the community! #KosasakiPaasaPugazhExperiments', '💡 AI/ML Update', ARRAY['linear-regression', 'colab', 'learning'], 'text', NOW() - INTERVAL '9 hours', 11),

('00000000-0000-0000-0000-000000000000', '🚀 Cuebo.ai is hiring 2 interns! They build tools for sales teams and are growing fast. Work with text/audio data, LLMs, NLP models. Requirements: Python, Git, LLMs/NLP experience is a plus. Minimum 3 month commitment, potential full-time conversion. Apply: https://lnkd.in/gJKi7Qfy', '🚀 Hiring/Internship Opportunity', ARRAY['Cuebo', 'sales-tools', 'NLP', 'Python'], 'text', NOW() - INTERVAL '10 hours', 10),

('00000000-0000-0000-0000-000000000000', '💡 Gentle reminder for today''s event! Please drop a message if you can''t join. Network issues due to cyclone in Chennai - offering help and safe parking at my place in Triplicane. Community support matters! What are your learning requirements? Let''s plan better.', '💡 AI/ML Update', ARRAY['event', 'community', 'support', 'Chennai'], 'text', NOW() - INTERVAL '11 hours', 13),

('00000000-0000-0000-0000-000000000000', '🚀 Backend intern position at Potpie AI, Bengaluru! Great opportunity for those interested in backend development and AI. Check out the LinkedIn post for details. Building the future of AI-powered development tools!', '🚀 Hiring/Internship Opportunity', ARRAY['backend', 'Potpie', 'Bengaluru', 'AI-tools'], 'text', NOW() - INTERVAL '12 hours', 8),

('00000000-0000-0000-0000-000000000000', '💡 Today''s call featuring Mazic.io team! Exciting to have Sastra alumni represented. Check out their profiles - inspiring to see our community members succeeding in the industry. Proud moment for all of us! 😌', '💡 AI/ML Update', ARRAY['call', 'Mazic', 'Sastra', 'alumni'], 'text', NOW() - INTERVAL '13 hours', 14),

('00000000-0000-0000-0000-000000000000', '🚀 Internship at PW Exponent Venture Capital! Great opportunity in the investment space. Please schedule meetings through the Flow platform. Learning about SaaS tools and product development - voice-to-text on iPhone is incredibly good for productivity!', '🚀 Hiring/Internship Opportunity', ARRAY['venture-capital', 'investment', 'productivity'], 'text', NOW() - INTERVAL '14 hours', 7),

('00000000-0000-0000-0000-000000000000', '💡 Quick workshop: Build AR/VR app in your browser in 40 minutes! Join Arvind Iyer (AI Architect, Nokia) this Saturday 14th December, 1 PM. We''ll use A-Frame library, build from scratch, and deploy online. No prior framework knowledge needed!', '💡 AI/ML Update', ARRAY['AR', 'VR', 'workshop', 'A-Frame', 'Nokia'], 'text', NOW() - INTERVAL '15 hours', 16),

('00000000-0000-0000-0000-000000000000', '📚 Identifying Girish Mathrubootham (Freshworks founder) in the photo - the man who wrote the first $1M cheque in 2011! He prefers people work for a few years before starting up, not directly from campus. Valuable entrepreneurship insight!', '📚 RAG & AI Copilots', ARRAY['Freshworks', 'entrepreneurship', 'startup-advice'], 'text', NOW() - INTERVAL '16 hours', 9),

('00000000-0000-0000-0000-000000000000', '🚀 GenerativeAI research hiring! TCS is hiring freshers for specific roles through alumni referrals (not campus route). Looking for strong software engineering skills and ML basics. Better than TCS Digital roles! Form rolling out soon for curation.', '🚀 Hiring/Internship Opportunity', ARRAY['TCS', 'GenerativeAI', 'research', 'referrals'], 'text', NOW() - INTERVAL '17 hours', 11),

('00000000-0000-0000-0000-000000000000', '💡 Thanks for the mention! GuardrailsAI has a new high-quality PII detection model. Microsoft Language API''s PII detection is more accurate and supports more languages (though closed source). Product tutorials don''t have to be boring - add background music! 🎵', '💡 AI/ML Update', ARRAY['GuardrailsAI', 'PII', 'Microsoft', 'tutorials'], 'text', NOW() - INTERVAL '18 hours', 6),

('00000000-0000-0000-0000-000000000000', '📚 All about synthetic data generation - great resource for the Sukoon team and Varshitha! Check out the Ragas blog for inspiration. This is from startup CloudFarm. Synthetic data is revolutionizing AI training!', '📚 RAG & AI Copilots', ARRAY['synthetic-data', 'Ragas', 'CloudFarm', 'AI-training'], 'text', NOW() - INTERVAL '19 hours', 8),

('00000000-0000-0000-0000-000000000000', '💡 Building AI Agents in Production workshop at BITS Pilani! Covering: What is an AI Agent vs LLM, Autonomy through planning/reasoning, Traditional vs AI Agent approach, Live coding session. Tuesday Nov 26, 7:30 PM IST. Open to external participants!', '💡 AI/ML Update', ARRAY['AI-agents', 'BITS-Pilani', 'workshop', 'production'], 'text', NOW() - INTERVAL '20 hours', 12),

('00000000-0000-0000-0000-000000000000', '🚀 TCS hiring form for specific roles! Alumni ready to refer skilled candidates in software engineering and ML basics. Fill out: https://forms.gle/xDHHnqgixBzfSxWy5. Better opportunities than standard campus placements!', '🚀 Hiring/Internship Opportunity', ARRAY['TCS', 'referrals', 'software-engineering', 'ML'], 'text', NOW() - INTERVAL '21 hours', 9),

('00000000-0000-0000-0000-000000000000', '💡 Even Flow (video streaming) lacks calendar integration features - such poor UX! Google''s integration with chat and iPhone''s voice-to-text are excellent examples of good product design. Learning AI/algorithms is just part of building great products!', '💡 AI/ML Update', ARRAY['product-design', 'UX', 'integration', 'voice-to-text'], 'text', NOW() - INTERVAL '22 hours', 5),

('00000000-0000-0000-0000-000000000000', '💡 Questions form for upcoming meet: https://forms.gle/CcbNffcQbw9KyGPJ6. Also, AR/VR workshop this Saturday - build a browser app in 40 mins using A-Frame library. Deploy online and share with friends! Great hands-on learning opportunity.', '💡 AI/ML Update', ARRAY['questions', 'meeting', 'AR-VR', 'A-Frame'], 'text', NOW() - INTERVAL '23 hours', 7),

('00000000-0000-0000-0000-000000000000', '💡 Network is terrible due to cyclone 😭 Trying to sustain on mobile data. Community support during natural disasters shows our resilience. Thanks everyone for understanding the connectivity issues during our calls!', '💡 AI/ML Update', ARRAY['cyclone', 'network', 'community', 'support'], 'text', NOW() - INTERVAL '24 hours', 4),

('00000000-0000-0000-0000-000000000000', '💡 Learning requirements discussion - what are your blockers? Don''t just say ''I am lazy'' 😅 Let''s identify real challenges and plan better. Car parking available, safe area in Triplicane. Community members, feel free to reach out for help during the cyclone!', '💡 AI/ML Update', ARRAY['learning', 'planning', 'community-help', 'cyclone'], 'text', NOW() - INTERVAL '25 hours', 3);