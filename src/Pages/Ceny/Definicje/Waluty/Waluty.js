import 'devextreme/data/odata/store';
import {
  Column,
  Editing,
  Form,
  Popup,
  Position
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import ODataStore from 'devextreme/data/odata/store';
import XDataGrid from '../../../../components/XDataGrid/XDataGrid';
import { walutyDataSource } from '../../../../api/waluty';
import React, { useRef, useState, useEffect } from 'react';

//dev-extreme
import 'devextreme/data/odata/store';

import 'devextreme-react/text-area';

//styles
import './waluty.scss';

const dataSource = walutyDataSource();

const Waluty = () => {
  const [heightDlaGrid, setHeightDlaGrid] = useState(0);
  const sectionRef = useRef(null);

  const onContentReady = (e) => {
    console.log('oncontentReady: ', e);
    e.component.columnOption('command:edit', 'visibleIndex: 2');
  };

  useEffect(() => {
    setHeightDlaGrid(sectionRef.current.clientHeight);
  }, []);

  return (
    <section className="waluty" ref={sectionRef}>
      <XDataGrid
        heightDlaGrid={heightDlaGrid}
        dataSource={dataSource}
        onContentReady={onContentReady}
        
      >
        <Editing allowUpdating mode="popup" allowDeleting allowAdding>
          <Popup
            title="Edycja waluty"
            showTitle={true}
            width={700}
            height={525}
          >
            <Position my="center" at="center" of={window} />
          </Popup>
          <Form colCount={1}>
            <Item itemType="group">
              <Item
                dataField="Symbol"
                validationRules={[{ type: 'required' }]}
              />
              <Item
                dataField="Nazwa"
                validationRules={[{ type: 'required' }]}
              />
              <Item dataField="Kurs" editorOptions={{ format: '#0.0000' }} />
            </Item>
          </Form>
        </Editing>
        <Column
          caption="Actions"
          type="buttons"
          alignment="center"
          width={120}
          fixed
        />
        <Column dataField="Symbol" width={500} caption={'Symbol'} />
        <Column dataField="Nazwa" />
        <Column dataField="Kurs" alignment="right" width={120} />
        <Form labelLocation="top" />
        <Popup showTitle title="Edycja" />
      </XDataGrid>
    </section>
  );
};

export default Waluty;
