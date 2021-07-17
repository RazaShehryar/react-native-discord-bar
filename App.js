import _ from 'lodash';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import uuid from 'react-native-uuid';
import RenderItem from './components/RenderItem';
import insert from './functions/insert';
import removeUndefined from './functions/removeUndefined';
import selectKey from './functions/selectKey';

const list = [
  require('./assets/facebook.png'),
  require('./assets/google-plus.png'),
  require('./assets/twitter.png'),
  require('./assets/discord.png'),
];
const App = () => {
  const arr = [
    {name: require('./assets/facebook.png'), key: uuid.v4()},
    {name: require('./assets/google-plus.png'), key: uuid.v4()},
    {name: require('./assets/twitter.png'), key: uuid.v4()},
    {name: require('./assets/discord.png'), key: uuid.v4()},
    {
      name: require('./assets/plus-green.png'),
      key: uuid.v4(),
      disabledDrag: true,
      disabledReSorted: true,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState();
  const [state, setState] = useState(arr);
  const [change, setChange] = useState();
  const [currentItem, setCurrentItem] = useState();

  return (
    <View style={styles.wrapper}>
      <DraggableGrid
        numColumns={1}
        itemHeight={50}
        renderItem={(item, order) => (
          <View>
            <RenderItem
              item={item}
              order={order}
              currentIndex={currentIndex}
              change={change}
            />
          </View>
        )}
        data={state}
        onDragStart={e => {
          setCurrentIndex(state.indexOf(e));
          setCurrentItem(e);
        }}
        onResetSort={e => {
          let currItem = e.find(o => o?.key === currentItem?.key);
          let currIndex = e.indexOf(currItem);
          let prevItem = e[currIndex - 1];
          if (!prevItem?.expanded && !prevItem?.folder) {
            let omit = e.map((r, i) =>
              i === currIndex ? _.omit(r, ['expanded', 'parentKey']) : r,
            );
            let map = omit.map(r =>
              r?.folder
                ? {
                    ...r,
                    items: r.items.filter(m => m?.key !== currItem?.key),
                    collapsed: false,
                  }
                : r,
            );
            setState(map);
          } else {
            setState(e);
          }
          setCurrentIndex(currIndex);
          setChange();
        }}
        onItemPress={e => {
          const {collapsed, folder, items, disabledDrag} = e || {};
          if (disabledDrag) {
            setState(
              insert(state, state.length - 1, {
                name: _.sample(list),
                key: uuid.v4(),
              }),
            );
          } else {
            let findIndex = state.indexOf(e);
            let data = state.map(r =>
              r?.key === e?.key ? {...e, collapsed: !e?.collapsed} : r,
            );
            if (folder) {
              if (collapsed) {
                for (let index = 0; index < items.length; index++) {
                  data.splice(findIndex + index + 1, 0, {
                    ...items[index],
                    expanded: true,
                    parentKey: e?.key,
                  });
                }
                setState(data);
              } else if (!collapsed) {
                setState(data.filter(o => o?.parentKey !== e?.key));
              }
            }
          }
        }}
        onDragging={e => {
          if (currentIndex >= 0) {
            if (_.inRange(e.dy, 23, 25)) {
              let find = state[currentIndex];
              let nextItem = state[currentIndex + 1];
              if (
                !find?.folder &&
                !nextItem?.disabledReSorted &&
                !nextItem?.expanded &&
                ((nextItem?.folder && nextItem?.collapsed) || !nextItem?.folder)
              ) {
                setChange('positive');
              } else {
                setChange();
              }
            } else if (_.inRange(e.dy, -23, -25)) {
              let find = state[currentIndex];
              let prevItem = state[currentIndex - 1];
              let findArr = state.map(r =>
                r?.items?.map(p => p.key).includes(find?.key) || !r?.items
                  ? true
                  : false,
              );
              if (
                !find?.folder &&
                !prevItem?.disabledReSorted &&
                !prevItem?.expanded &&
                findArr.some(m => m) &&
                ((prevItem?.folder && prevItem?.collapsed) || !prevItem?.folder)
              ) {
                setChange('negative');
              } else {
                setChange();
              }
            }
          }
        }}
        onDragRelease={newData => {
          const key = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5);
          let data = newData.filter(r => r?.items?.length > 0 || !r?.items);
          if (change === 'positive') {
            let findItemIndex = currentIndex;
            let findNextItem = data.find((r, i) => i === findItemIndex + 1);
            let filter = data
              .filter((r, i) => i !== findItemIndex && i !== findItemIndex + 1)
              .map(r =>
                r?.items
                  ? {
                      ...r,
                      items: r?.items.filter(l => l.key !== currentItem.key),
                    }
                  : r,
              );
            let check = findNextItem?.folder;
            let result = [];
            if (!check) {
              result = insert(filter, findItemIndex, {
                key: key,
                folder: true,
                collapsed: true,
                items: !check
                  ? [
                      {...findNextItem, parentKey: key},
                      {...currentItem, parentKey: key},
                    ]
                  : [...findNextItem.items, {...currentItem, parentKey: key}],
              });
            } else {
              result = insert(filter, findItemIndex, {
                key: findNextItem?.key,
                folder: true,
                collapsed: true,
                items: !check
                  ? [
                      {...findNextItem, parentKey: findNextItem?.key},
                      {...currentItem, parentKey: findNextItem?.key},
                    ]
                  : [
                      ...findNextItem.items,
                      {...currentItem, parentKey: findNextItem?.key},
                    ],
              });
            }

            setState(removeUndefined(result));
          } else if (change === 'negative') {
            let findItemIndex = currentIndex;
            let findPrevItem = data.find((r, i) => i === findItemIndex - 1);
            let filter = data.filter(
              (r, i) => i !== findItemIndex && i !== findItemIndex - 1,
            );
            let check = findPrevItem?.folder;
            if (findItemIndex !== 0) {
              let result = [];
              if (!check) {
                result = insert(filter, findItemIndex - 1, {
                  key: key,
                  folder: true,
                  collapsed: true,
                  items: !check
                    ? [
                        {...findPrevItem, parentKey: key},
                        {...currentItem, parentKey: key},
                      ]
                    : [...findPrevItem.items, {...currentItem, parentKey: key}],
                });
              } else {
                result = insert(filter, findItemIndex - 1, {
                  key: findPrevItem?.key,
                  folder: true,
                  collapsed: true,
                  items: !check
                    ? [
                        {...findPrevItem, parentKey: findPrevItem?.key},
                        {...currentItem, parentKey: findPrevItem?.key},
                      ]
                    : [
                        ...findPrevItem.items,
                        {...currentItem, parentKey: findPrevItem?.key},
                      ],
                });
              }
              setState(removeUndefined(result));
            }
          } else {
            let prev = data[currentIndex - 1];
            let curr = data[currentIndex];
            let next = data[currentIndex + 1];

            if (next?.parentKey || prev?.parentKey) {
              let newState = data
                .map((r, i) =>
                  i === currentIndex
                    ? {
                        ...r,
                        expanded: true,
                        parentKey: selectKey(next?.parentKey, prev?.parentKey),
                      }
                    : r,
                )
                .map(r => {
                  if ([next?.parentKey, prev?.parentKey].includes(r?.key)) {
                    let items = _.uniqBy([...r.items, curr], 'key');
                    let getOrder = data.filter(m =>
                      items.map(z => z?.key).includes(m?.key),
                    );
                    return {...r, items: getOrder};
                  } else if (curr?.parentKey === r?.key) {
                    return {
                      ...r,
                      items: r.items.filter(o => o?.key !== curr?.key),
                    };
                  } else {
                    return r;
                  }
                });
              setState(removeUndefined(newState));
            } else {
              setState(data);
            }
          }
          setCurrentIndex();
          setChange();
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingTop: '20%',
    justifyContent: 'center',
  },
});
