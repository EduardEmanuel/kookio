/* eslint-disable @typescript-eslint/no-explicit-any */

type AnyRecord = Record<string, any>;

export type LabelKind = 'where' | 'create' | 'createMany';

export type EntityLabelInput =
  | { kind: 'where'; where: AnyRecord | null | undefined }
  | { kind: 'create'; data: AnyRecord | null | undefined }
  | { kind: 'createMany'; data: unknown };

export type EntityLabelers = {
  label: (input: EntityLabelInput) => string;
  fromWhere: (where: AnyRecord | null | undefined) => string;
  fromCreateData: (data: AnyRecord | null | undefined) => string;
  fromCreateManyData: (data: unknown) => string;
};

type KeyPath = string | string[];

type MakeEntityLabelersOptions = {
  /** ex: "ingredient" */
  entityName: string;

  /**
   * (opțional) set de “identity rules” pentru where:
   * fiecare rule e o listă de keyPaths care trebuie să existe ca să formatăm un label.
   */
  whereIdentity?: Array<{
    keys: KeyPath[];
    format: (where: AnyRecord) => string;
  }>;

  /**
   * (opțional) set de “identity rules” pentru create.data
   */
  createIdentity?: Array<{
    keys: KeyPath[];
    format: (data: AnyRecord) => string;
  }>;

  /** (opțional) cum extragi name pentru createMany */
  createManyNameKey?: string; // default: "name"

  /** (opțional) custom string pentru unknown */
  unknownLabel?: string; // default: `${entityName}(unknown)`
};

const hasPath = (obj: AnyRecord, path: KeyPath): boolean => {
  if (!obj) return false;
  const parts = Array.isArray(path) ? path : path.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null || !(p in cur)) return false;
    cur = cur[p];
  }
  return cur != null;
};

export const makeEntityLabelers = (
  opts: MakeEntityLabelersOptions,
): EntityLabelers => {
  const entity = opts.entityName;
  const unknown = opts.unknownLabel ?? `${entity}(unknown)`;
  const manyNameKey = opts.createManyNameKey ?? 'name';

  const fromWhere = (where: AnyRecord | null | undefined): string => {
    if (!where) return unknown;

    // 1) custom rules first
    if (opts.whereIdentity?.length) {
      for (const rule of opts.whereIdentity) {
        const ok = rule.keys.every((k) => hasPath(where as AnyRecord, k));
        if (ok) return rule.format(where as AnyRecord);
      }
    }

    // 2) default fallbacks
    if (where['id']) return `${entity}(id=${where['id']})`;
    if (where['name']) return `${entity}(name=${where['name']})`;

    return unknown;
  };

  const fromCreateData = (data: AnyRecord | null | undefined): string => {
    if (!data) return unknown;

    // 1) custom rules first
    if (opts.createIdentity?.length) {
      for (const rule of opts.createIdentity) {
        const ok = rule.keys.every((k) => hasPath(data as AnyRecord, k));
        if (ok) return rule.format(data as AnyRecord);
      }
    }

    // 2) default fallbacks
    if (data['name']) return `${entity}(name=${data['name']})`;
    return unknown;
  };

  const fromCreateManyData = (data: unknown): string => {
    const arr = Array.isArray(data) ? data : data ? [data] : [];
    if (arr.length === 0) return `${entity}s(0)`;

    const names = arr
      .map(
        (i: any, idx: number) =>
          `${idx}. ${i?.[manyNameKey] ?? '(missing name)'}`,
      )
      .join('; ');

    return `${entity}s(${arr.length}): ${names}`;
  };

  const label = (input: EntityLabelInput): string => {
    switch (input.kind) {
      case 'where':
        return fromWhere(input.where);
      case 'create':
        return fromCreateData(input.data);
      case 'createMany':
        return fromCreateManyData(input.data);
      default:
        return unknown;
    }
  };

  return { label, fromWhere, fromCreateData, fromCreateManyData };
};
