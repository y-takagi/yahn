import React from 'react';

import { ItemDto } from './api/data';
import { Item } from './item';

interface ItemsProps {
  items: ItemDto[];
}

export function Items(props: ItemsProps) {
  const items = props.items.map((item) => <Item key={item.id} item={item} />);
  return <div className="flex flex-col self-stretch space-y-6">{items}</div>;
}
