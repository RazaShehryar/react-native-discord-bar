const removeUndefined = array =>
  array
    .map(o =>
      o?.items?.includes(undefined) || o?.items?.length === 0 ? undefined : o,
    )
    .filter(r => r);

export default removeUndefined;
