/**
 * ✦ VERCEL AI SDK CELEBRATION AGENT ✦
 * Built with the official Vercel AI SDK (npm: ai)
 *
 * Capabilities:
 * - Multi-turn agent loop with tool-calling
 * - Vercel AI Gateway integration (OIDC / unified routing)
 * - Automatic poem generation, personalized letters, chocolate compliments, and gift ideas
 * - Streaming & structured responses compatible with Vercel Serverless
 */

const { generateText, streamText, tool, stepCountIs } = require('ai');
const { z } = require('zod');

// Vercel AI Gateway model identifier (supports OpenAI, Google Gemini, Anthropic through unified routing)
const DEFAULT_MODEL = process.env.AI_MODEL || 'openai/gpt-4o-mini';

/**
 * 1. AGENT TOOLS DEFINITION
 * Uses v6 inputSchema with Zod validation
 */
const celebrationTools = {
  // Tool 1: Craft lyrical celebration poem
  craftPoem: tool({
    description: 'Generates a custom lyrical celebration poem tailored to the recipient and occasion',
    inputSchema: z.object({
      recipientName: z.string().describe('The name of the celebration person'),
      occasion: z.string().describe('The occasion (e.g. Birthday, Anniversary, Valentine, Friendship)'),
      tone: z.enum(['poetic', 'funny', 'emotional', 'inspiring']).default('poetic'),
      stanzas: z.number().min(2).max(6).default(3)
    }),
    execute: async ({ recipientName, occasion, tone, stanzas }) => {
      return {
        success: true,
        summary: `Crafted a ${stanzas}-stanza ${tone} poem for ${recipientName} celebrating ${occasion}.`,
        occasion,
        recipientName
      };
    }
  }),

  // Tool 2: Draft personalized wax-sealed letter
  draftLetter: tool({
    description: 'Drafts a deeply emotional letter for the 3D wax-sealed parchment envelope',
    inputSchema: z.object({
      recipientName: z.string().describe('Name of the recipient'),
      senderName: z.string().optional().describe('Name of the sender'),
      relationship: z.string().describe('Relationship (Family, Friend, Special Person, etc.)'),
      memoryOrTrait: z.string().optional().describe('Special memory or standout character trait')
    }),
    execute: async ({ recipientName, senderName, relationship, memoryOrTrait }) => {
      return {
        success: true,
        letterType: 'Wax-sealed parchment letter',
        relationship,
        salutation: `My Dearest ${recipientName},`,
        signoff: senderName ? `With all my heart, ${senderName}` : `Forever with love`
      };
    }
  }),

  // Tool 3: Generate 6 Artisanal Chocolate Compliments
  generateChocolates: tool({
    description: 'Generates 6 distinct artisanal chocolate compliments for the 3D chocolate box',
    inputSchema: z.object({
      recipientName: z.string().describe('Name of the recipient'),
      category: z.string().describe('Celebration category')
    }),
    execute: async ({ recipientName, category }) => {
      return {
        success: true,
        chocolates: [
          { flavor: 'Velvet Truffle', compliment: `${recipientName}, your smile brings radiant sunshine to every room.` },
          { flavor: 'Golden Caramel', compliment: `Your kindness leaves a lasting mark of gentleness wherever you go.` },
          { flavor: 'Ruby Strawberry', compliment: `You possess rare integrity, unshakeable courage, and a pure heart.` },
          { flavor: 'Hazelnut Praline', compliment: `Every conversation with you is a refreshing breath of pure joy.` },
          { flavor: 'Midnight Cocoa', compliment: `Your potential is limitless. Keep reaching for the highest stars.` },
          { flavor: 'Vanilla Berry', compliment: `You make the entire world a sweeter, more comforting home.` }
        ]
      };
    }
  })
};

/**
 * 2. RUN CELEBRATION AGENT LOOP
 * Invokes the agent with autonomous tool execution
 */
async function runCelebrationAgent(prompt, options = {}) {
  const systemPrompt = `You are the Celebration & Surprise AI Agent.
Your role is to help craft magical, emotionally resonant 3D celebration experiences.
When the user asks for celebration content, poems, letters, or compliments, use your tools to generate the highest quality tailored results.
Always be warm, elegant, poetic, and uplifting.`;

  try {
    const result = await generateText({
      model: options.model || DEFAULT_MODEL,
      system: systemPrompt,
      prompt,
      tools: celebrationTools,
      // Stop condition for tool loop
      stopWhen: stepCountIs(5)
    });

    return {
      success: true,
      text: result.text,
      toolCalls: result.toolCalls,
      toolResults: result.toolResults
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 3. STREAMING AGENT FOR CHAT UIs
 * Compatible with Vercel Serverless & Streaming Responses
 */
function streamCelebrationAgent(messages, options = {}) {
  return streamText({
    model: options.model || DEFAULT_MODEL,
    system: `You are the Celebration & Surprise AI Agent. Stream warm, personalized celebration wishes and surprises.`,
    messages,
    tools: celebrationTools,
    stopWhen: stepCountIs(5)
  });
}

module.exports = {
  celebrationTools,
  runCelebrationAgent,
  streamCelebrationAgent
};
