/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * API Admin
 * Category Api
 * OpenAPI spec version: 1.0.0
 */
import type { CharacteristicUnit } from './characteristicUnit';

export interface Characteristic {
  characteristic: string;
  hideClient: boolean;
  id: number;
  unit: CharacteristicUnit;
  value: string;
}