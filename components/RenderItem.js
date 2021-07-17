import React from 'react';
import AddItem from '../components/AddItem';
import CollapsedView from '../components/CollapsedView';
import ExpandedItems from '../components/ExpandedItems';
import ExpandedView from '../components/ExpandedView';
import Item from '../components/Item';
import MakeFolder from '../components/MakeFolder';
import DisabledItem from './DisabledItem';

const RenderItem = ({item, order, change, currentIndex}) => {
  const {key, name, items, folder, expanded, collapsed, disabledDrag} =
    item || {};
  if (key === 'five') {
    return <AddItem name={name} key={key} />;
  } else if (
    change &&
    ((change === 'positive' && order === currentIndex + 1) ||
      (change === 'negative' && order === currentIndex - 1))
  ) {
    return <MakeFolder key={key} />;
  } else if (folder && collapsed) {
    return <ExpandedView items={items} key={key} />;
  } else if (folder && !collapsed) {
    return <CollapsedView key={key} />;
  } else if (expanded) {
    return <ExpandedItems name={name} key={key} />;
  } else if (disabledDrag) {
    return <DisabledItem name={name} key={key} />;
  }
  return <Item name={name} key={key} />;
};

export default RenderItem;
