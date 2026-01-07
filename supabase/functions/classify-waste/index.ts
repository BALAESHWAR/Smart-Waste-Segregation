import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      throw new Error('No image data provided');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Classifying waste image with AI...');

    // Call Lovable AI Gateway with vision capabilities
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert waste classification AI. Analyze the image and classify it into one of these categories:

1. **dry** - Recyclable materials: paper, cardboard, plastic bottles, metal cans, glass jars, packaging materials
2. **wet** - Organic/biodegradable: vegetable peels, leftover food, tea powder, fruit skins, garden waste
3. **hazardous** - Dangerous materials: batteries, paint, chemicals, syringes, medical waste, broken bulbs
4. **ewaste** - Electronic waste: phones, chargers, earphones, keyboards, old gadgets, cables
5. **sanitary** - Personal hygiene: diapers, sanitary pads, tissues, cotton swabs, bandages
6. **reject** - Non-recyclable: thermocol, chips packets, disposable cups/plates, multilayer packaging

Respond ONLY with a JSON object in this exact format:
{
  "category": "one of: dry, wet, hazardous, ewaste, sanitary, reject",
  "confidence": number between 0-100,
  "item": "brief description of what you see"
}

Be accurate and provide confidence based on how clearly you can identify the waste type.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please classify this waste item.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI usage limit reached. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from AI');
    }

    console.log('AI Response:', content);

    // Parse the JSON response from AI
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid response format from AI');
    }

    // Validate the result
    const validCategories = ['dry', 'wet', 'hazardous', 'ewaste', 'sanitary', 'reject'];
    if (!validCategories.includes(result.category)) {
      throw new Error('Invalid category returned by AI');
    }

    console.log('Classification successful:', result);

    return new Response(
      JSON.stringify(result),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in classify-waste function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
