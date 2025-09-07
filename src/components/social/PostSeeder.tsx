import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

const seedPosts = [
  {
    content: "🚀 Hiring an intern/contractor! I'm hiring for a short term project in Applied AI. Must haves: - Experience with Instructor/Structured output generation from LLMs. - Experience with prompting LLMs by understanding Biz outcomes. - Knowing or ready to pickup LiteLLM or Gateway by Portkey. How to apply: email your best GenAI project at rachitt01@gmail.com",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["hiring", "AI", "internship", "LLM"],
    post_type: "text"
  },
  {
    content: "🤖 That's exactly what they said in school😂 Creative AI is making waves! A meme creating AI SaaS made $100k with just 3 founders. Check out SuperMeme.ai - it's incredibly good at creating contextual memes with perfect semantics. Think of it as raising the bar for meme creators, not replacing them!",
    category: "🤖 Creative AI in Action", 
    tags: ["AI", "creative", "SaaS", "memes"],
    post_type: "text"
  },
  {
    content: "📚 Deep Learning Interview Book - Essential reading for anyone preparing for AI/ML interviews. Also sharing some exciting updates about Freshworks founder Girish Mathrubootham and early startup investments. The entrepreneurial ecosystem is thriving!",
    category: "📚 RAG & AI Copilots",
    tags: ["deep-learning", "interviews", "startups"],
    post_type: "text"
  },
  {
    content: "🚀 Kothari Fellowship applications are open! Please apply at kotharifellowship.com. Also, job posting for Fresher AI Creative at Gobo Labs - looking for passionate individuals with prompt engineering skills and ComfyUI familiarity. Send resume to production@gobolabs.in",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["fellowship", "AI", "creative", "GoboLabs"],
    post_type: "text"
  },
  {
    content: "💡 POLL: How many have cleared JEE Mains (general cutoff)? This helps when I speak to founders. No bias if you haven't - I understand coaching is expensive. Let's focus on skills and passion! 📊 Results: Yes (12 votes), No (1 vote)",
    category: "💡 AI/ML Update",
    tags: ["poll", "JEE", "community"],
    post_type: "question"
  },
  {
    content: "🚀 Internship opportunity for LLM evaluation and POCs! Paid ₹15k. Looking for people comfortable with Hugging Face models and quick demos. Contact details: LinkedIn profile of Chitra Gozeal. Great opportunity for hands-on AI experience!",
    category: "🚀 Hiring/Internship Opportunity", 
    tags: ["internship", "LLM", "evaluation", "HuggingFace"],
    post_type: "text"
  },
  {
    content: "💡 Azure's advanced AI search capabilities are impressive! Also sharing that exams are ongoing, so please be patient with resume submissions. When does the semester end? We'll coordinate better post-exams.",
    category: "💡 AI/ML Update",
    tags: ["Azure", "AI", "search", "exams"],
    post_type: "text"
  },
  {
    content: "🚀 Congratulations to everyone who got internships this semester! @PayPal intern and others - proud of your achievements! For others, remember: அடிமேல் அடி அடித்தால் அம்மியும் நகரும் (Persistent effort moves even the stone). Keep pushing!",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["congratulations", "internships", "motivation"],
    post_type: "achievement"
  },
  {
    content: "💡 Fantastic work on the linear regression Colab by Varshitha! Check out the implementation: https://colab.research.google.com/drive/1GvRopmOpCsxpaUIUOLCl8OWqaa5gtsjX?usp=sharing. Great learning resource for the community! #KosasakiPaasaPugazhExperiments",
    category: "💡 AI/ML Update",
    tags: ["linear-regression", "colab", "learning"],
    post_type: "text"
  },
  {
    content: "🚀 Cuebo.ai is hiring 2 interns! They build tools for sales teams and are growing fast. Work with text/audio data, LLMs, NLP models. Requirements: Python, Git, LLMs/NLP experience is a plus. Minimum 3 month commitment, potential full-time conversion. Apply: https://lnkd.in/gJKi7Qfy",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["Cuebo", "sales-tools", "NLP", "Python"],
    post_type: "text"
  },
  {
    content: "💡 Gentle reminder for today's event! Please drop a message if you can't join. Network issues due to cyclone in Chennai - offering help and safe parking at my place in Triplicane. Community support matters! What are your learning requirements? Let's plan better.",
    category: "💡 AI/ML Update", 
    tags: ["event", "community", "support", "Chennai"],
    post_type: "text"
  },
  {
    content: "🚀 Backend intern position at Potpie AI, Bengaluru! Great opportunity for those interested in backend development and AI. Check out the LinkedIn post for details. Building the future of AI-powered development tools!",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["backend", "Potpie", "Bengaluru", "AI-tools"],
    post_type: "text"
  },
  {
    content: "💡 Today's call featuring Mazic.io team! Exciting to have Sastra alumni represented. Check out their profiles - inspiring to see our community members succeeding in the industry. Proud moment for all of us! 😌",
    category: "💡 AI/ML Update",
    tags: ["call", "Mazic", "Sastra", "alumni"],
    post_type: "text"
  },
  {
    content: "🚀 Internship at PW Exponent Venture Capital! Great opportunity in the investment space. Please schedule meetings through the Flow platform. Learning about SaaS tools and product development - voice-to-text on iPhone is incredibly good for productivity!",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["venture-capital", "investment", "productivity"],
    post_type: "text"
  },
  {
    content: "💡 Quick workshop: Build AR/VR app in your browser in 40 minutes! Join Arvind Iyer (AI Architect, Nokia) this Saturday 14th December, 1 PM. We'll use A-Frame library, build from scratch, and deploy online. No prior framework knowledge needed!",
    category: "💡 AI/ML Update",
    tags: ["AR", "VR", "workshop", "A-Frame", "Nokia"],
    post_type: "text"
  },
  {
    content: "📚 Identifying Girish Mathrubootham (Freshworks founder) in the photo - the man who wrote the first $1M cheque in 2011! He prefers people work for a few years before starting up, not directly from campus. Valuable entrepreneurship insight!",
    category: "📚 RAG & AI Copilots",
    tags: ["Freshworks", "entrepreneurship", "startup-advice"],
    post_type: "text"
  },
  {
    content: "🚀 GenerativeAI research hiring! TCS is hiring freshers for specific roles through alumni referrals (not campus route). Looking for strong software engineering skills and ML basics. Better than TCS Digital roles! Form rolling out soon for curation.",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["TCS", "GenerativeAI", "research", "referrals"],
    post_type: "text"
  },
  {
    content: "💡 Thanks for the mention! GuardrailsAI has a new high-quality PII detection model. Microsoft Language API's PII detection is more accurate and supports more languages (though closed source). Product tutorials don't have to be boring - add background music! 🎵",
    category: "💡 AI/ML Update",
    tags: ["GuardrailsAI", "PII", "Microsoft", "tutorials"],
    post_type: "text"
  },
  {
    content: "📚 All about synthetic data generation - great resource for the Sukoon team and Varshitha! Check out the Ragas blog for inspiration. This is from startup CloudFarm. Synthetic data is revolutionizing AI training!",
    category: "📚 RAG & AI Copilots",
    tags: ["synthetic-data", "Ragas", "CloudFarm", "AI-training"],
    post_type: "text"
  },
  {
    content: "💡 Building AI Agents in Production workshop at BITS Pilani! Covering: What is an AI Agent vs LLM, Autonomy through planning/reasoning, Traditional vs AI Agent approach, Live coding session. Tuesday Nov 26, 7:30 PM IST. Open to external participants!",
    category: "💡 AI/ML Update",
    tags: ["AI-agents", "BITS-Pilani", "workshop", "production"],
    post_type: "text"
  },
  {
    content: "🚀 TCS hiring form for specific roles! Alumni ready to refer skilled candidates in software engineering and ML basics. Fill out: https://forms.gle/xDHHnqgixBzfSxWy5. Better opportunities than standard campus placements!",
    category: "🚀 Hiring/Internship Opportunity",
    tags: ["TCS", "referrals", "software-engineering", "ML"],
    post_type: "text"
  },
  {
    content: "💡 Even Flow (video streaming) lacks calendar integration features - such poor UX! Google's integration with chat and iPhone's voice-to-text are excellent examples of good product design. Learning AI/algorithms is just part of building great products!",
    category: "💡 AI/ML Update",
    tags: ["product-design", "UX", "integration", "voice-to-text"],
    post_type: "text"
  },
  {
    content: "💡 Questions form for upcoming meet: https://forms.gle/CcbNffcQbw9KyGPJ6. Also, AR/VR workshop this Saturday - build a browser app in 40 mins using A-Frame library. Deploy online and share with friends! Great hands-on learning opportunity.",
    category: "💡 AI/ML Update",
    tags: ["questions", "meeting", "AR-VR", "A-Frame"],
    post_type: "text"
  },
  {
    content: "💡 Network is terrible due to cyclone 😭 Trying to sustain on mobile data. Community support during natural disasters shows our resilience. Thanks everyone for understanding the connectivity issues during our calls!",
    category: "💡 AI/ML Update",
    tags: ["cyclone", "network", "community", "support"],
    post_type: "text"
  },
  {
    content: "💡 Learning requirements discussion - what are your blockers? Don't just say 'I am lazy' 😅 Let's identify real challenges and plan better. Car parking available, safe area in Triplicane. Community members, feel free to reach out for help during the cyclone!",
    category: "💡 AI/ML Update",
    tags: ["learning", "planning", "community-help", "cyclone"],
    post_type: "text"
  }
];

export function PostSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSeedPosts = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to seed posts.",
        variant: "destructive"
      });
      return;
    }

    setIsSeeding(true);
    try {
      // Check if posts already exist
      const { data: existingPosts } = await supabase
        .from('posts')
        .select('id')
        .limit(1);

      if (existingPosts && existingPosts.length > 0) {
        toast({
          title: "Posts already exist",
          description: "The feed already has posts. Seeding skipped.",
        });
        setIsSeeding(false);
        return;
      }

      // Seed posts with current user as author
      const postsToInsert = seedPosts.map((post, index) => ({
        ...post,
        author_id: user.id,
        created_at: new Date(Date.now() - (index * 3600000)).toISOString() // Spread posts over time
      }));

      const { error } = await supabase
        .from('posts')
        .insert(postsToInsert);

      if (error) throw error;

      toast({
        title: "Posts seeded successfully!",
        description: `Added ${seedPosts.length} posts to the platform.`,
      });
    } catch (error) {
      console.error('Error seeding posts:', error);
      toast({
        title: "Error seeding posts",
        description: "Failed to seed posts. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSeeding(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Seed Initial Content</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Add 25 curated posts from the Kosaksi community to populate the feed with real content.
        </p>
        <Button 
          onClick={handleSeedPosts} 
          disabled={isSeeding}
          className="w-full"
        >
          {isSeeding ? "Seeding Posts..." : "Seed Posts"}
        </Button>
      </CardContent>
    </Card>
  );
}