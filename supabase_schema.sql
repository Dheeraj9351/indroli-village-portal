-- ==============================================================================
-- ग्राम पंचायत इन्द्रौली - नागरिक शिकायत एवं सुझाव प्रणाली (Production Database Schema)
-- Supabase PostgreSQL Secure Production Configuration
-- ==============================================================================
-- सुरक्षा एवं वास्तुकला विवरण (Zero-Trust Security Architecture):
-- 1. Row Level Security (RLS) पूर्ण रूप से सक्षम (Enabled) है।
-- 2. कोई भी सार्वजनिक (Public/Anon) SELECT या INSERT नीति नहीं दी गई है।
--    इससे इंटरनेट से सार्वजनिक ब्राउज़र क्लाइंट्स (Anon Key) द्वारा सीधे डेटा पढ़ने
--    या लिखने का एक्सेस 100% अवरुद्ध (Deny All) रहता है।
-- 3. सभी डेटा रीड एवं राइट केवल अधिकृत सर्वर-साइड API (/api/*) के माध्यम से
--    होते हैं, जो सर्वर-साइड 'SUPABASE_SERVICE_ROLE_KEY' का उपयोग करते हैं।
-- 4. कोई भी असत्यापित या फ़र्ज़ी डेमो डेटा (Fabricated Citizen Records) इस स्कीमा में नहीं है।
-- ==============================================================================

-- 1. शिकायतों एवं सुझावों की तालिका (Complaints and Suggestions Table)
CREATE TABLE IF NOT EXISTS public.complaints_and_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id VARCHAR(32) NOT NULL UNIQUE,
    record_type VARCHAR(20) NOT NULL DEFAULT 'complaint' CHECK (record_type IN ('complaint', 'suggestion', 'inquiry')),
    citizen_name VARCHAR(120) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    mohalla_location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'प्राप्त' CHECK (status IN ('प्राप्त', 'जाँच में', 'प्रगति पर', 'पूर्ण')),
    status_en VARCHAR(50) DEFAULT 'Received',
    action_note TEXT DEFAULT 'शिकायत नागरिक पोर्टल पर सफलतापूर्वक पंजीकृत हो गई है।',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. उच्च गति सर्च और इंडेक्सिंग (High Performance Indexes)
CREATE INDEX IF NOT EXISTS idx_complaints_ticket_id ON public.complaints_and_suggestions(ticket_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints_and_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_complaints_type ON public.complaints_and_suggestions(record_type);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON public.complaints_and_suggestions(created_at DESC);

-- 3. स्वचालित updated_at ट्रिगर (Automatic updated_at Trigger)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_complaints_updated_at ON public.complaints_and_suggestions;
CREATE TRIGGER trigger_complaints_updated_at
BEFORE UPDATE ON public.complaints_and_suggestions
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 4. Row Level Security (RLS) - पूर्णतः सक्षम (Zero Public Access)
ALTER TABLE public.complaints_and_suggestions ENABLE ROW LEVEL SECURITY;

-- किसी भी पूर्व सार्वजनिक नीतियों को सुरक्षित रूप से हटाएं (Revoke any Public Policies)
DROP POLICY IF EXISTS "Public can view only with exact ticketId" ON public.complaints_and_suggestions;
DROP POLICY IF EXISTS "Public insert only" ON public.complaints_and_suggestions;
DROP POLICY IF EXISTS "Public select" ON public.complaints_and_suggestions;
DROP POLICY IF EXISTS "Public insert" ON public.complaints_and_suggestions;

-- नोट: RLS सक्षम होने पर जब कोई 'anon' या 'authenticated' पॉलिसी नहीं होती,
-- तब PostgreSQL डिफ़ॉल्ट रूप से प्रत्यक्ष सार्वजनिक एक्सेस को पूरी तरह प्रतिबंधित (Deny All) करता है।
-- केवल अधिकृत बैकएंड सर्वर (Supabase Service Role Key) ही इस तालिका में रीड और राइट कर सकता है।
