/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Category Api
 * Category Api
 * OpenAPI spec version: 1.0.0
 */
import type { AltNameCreate } from "./alt-name/altNameCreate";
import type { CharacteristicCreate } from "./characteristic/characteristicCreate";
import type { TagCreate } from "./tagCreate";

export type CategoryCreateAllOf = {
  altNames?: AltNameCreate[];
  characteristics?: CharacteristicCreate[];
  images?: Blob[];
  tags?: TagCreate[];
};