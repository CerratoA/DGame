import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import type { Direction } from "grid-engine";

import type { Maps } from "../constants/assets";

interface IPosition {
  map: Maps;
  x?: number;
  y?: number;
  facingDirection: Direction;
}

interface IInventoryObject {
  objectId: number;
}

interface IPokemon {
  id: number;
  uniqId: number;
}

interface ISettings {
  general: {
    enableSound: boolean;
  };
}

interface IUserDataStore {
  onBicycle: boolean;
  position?: IPosition;
  inventory: IInventoryObject[];
  pokemons: IPokemon[];
  settings: ISettings;
  scenariosCompleted: number[];

  update: (state: Partial<IUserDataStore>) => void;
  addObjectToInventory: (objectId: number) => void;
  addPokemon: (id: number) => void;
  hasCompletedScenario: (scenarioId: number) => boolean;
  completeScenario: (scenarioId: number) => void;
}

export const useUserDataStore = create<IUserDataStore>()(
  devtools(
    persist(
      (set) => ({
        update: (updates: Partial<IUserDataStore>) => {
          set((state) => ({
            ...state,
            ...updates,
          }));
        },

        onBicycle: Boolean(false),
        inventory: [],
        pokemons: [],
        settings: {
          general: {
            enableSound: Boolean(true),
          },
        },
        scenariosCompleted: [],

        addPokemon: (id: number) => {
          const uniqId = Date.now();

          set((state) => ({
            ...state,
            pokemons: [
              ...state.pokemons,
              {
                id,
                uniqId,
              },
            ],
          }));
        },

        addObjectToInventory: (objectId: number) => {
          set((state) => ({
            ...state,
            inventory: [
              ...state.inventory,
              {
                objectId,
              },
            ],
          }));
        },

        hasCompletedScenario: (scenarioId: number) => {
          return useUserDataStore
            .getState()
            .scenariosCompleted.includes(scenarioId);
        },

        completeScenario: (scenarioId: number) => {
          set((state) => ({
            ...state,
            scenariosCompleted: [...state.scenariosCompleted, scenarioId],
          }));
        },
      }),
      {
        name: "userData",
      },
    ),
  ),
);
