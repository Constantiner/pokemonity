import { z } from "zod";

export const pokeTypeSchema = z.object({
	english: z.string(),
	chinese: z.string(),
	japanese: z.string(),
	effective: z.array(z.string()),
	ineffective: z.array(z.string()),
	no_effect: z.array(z.string())
});

export type PokeType = z.infer<typeof pokeTypeSchema>;

const booleanStringSchema = z.enum(["true", "false"]);

const abilitySchema = z.tuple([z.string(), booleanStringSchema]);

export const pokedexSchema = z.object({
	id: z.number(),
	name: z.object({
		english: z.string(),
		japanese: z.string(),
		chinese: z.string(),
		french: z.string()
	}),
	type: z.array(z.string()),
	base: z.object({
		HP: z.number(),
		Attack: z.number(),
		Defense: z.number(),
		"Sp. Attack": z.number(),
		"Sp. Defense": z.number(),
		Speed: z.number()
	}),
	species: z.string(),
	description: z.string(),
	evolution: z.object({
		prev: z.array(z.string()),
		next: z.array(z.array(z.string()))
	}),
	profile: z.object({
		height: z.string(),
		weight: z.string(),
		egg: z.array(z.string()),
		ability: z.array(abilitySchema),
		gender: z.string()
	}),
	image: z.object({
		sprite: z.string(),
		thumbnail: z.string(),
		hires: z.string()
	})
});

export type PokedexEntry = z.infer<typeof pokedexSchema>;
