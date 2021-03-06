import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Upload, Select, InputNumber, Divider, Spin, AutoComplete, Button, Table, Tooltip } from 'antd';
import { LoadingOutlined, PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { findIndex } from 'lodash';

import { PRODUCT_TYPE } from '../../config/constants.json';
import ComboProductForm from './AddCombo';

const { TextArea, Group, Search } = Input;
const { Option } = Select;

const formItem = {
  style: {
    marginBottom: '10px'
  }
}

const addonStyle = {
  backgroundColor: '#fafafa',
  color: 'rgba(0, 0, 0, 0.65)',
  cursor: 'default'
}

let comboProductForm;

const AddProduct = ({
  onSubmit,
  onClose,
  categories = [],
  manufacturers = [],
  ...rest
}, ref) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState(PRODUCT_TYPE.STANDARD);

  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue, getFieldValue } = form;
  const categoryOptions = categories.map(({ Name, _id }) => <Option key={_id} value={_id} label={Name}>{Name}</Option>);
  const manufacturerOptions = manufacturers.map(({ Name, _id }) => <Option key={_id} label={Name}>{Name}</Option>)

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload Image</div>
    </div>
  );


  useImperativeHandle(ref, () => ({
    setValue: ({
      Name,
      Code,
      Description,
      Type,
      CategoryId,
      ManufacturerId,
      Price,
      Cost,
      MinQty,
      Combo
    }) => {
      setProductType(Type);

      setFieldsValue({
        name: Name,
        code: Code,
        description: Description,
        type: Type,
        category: CategoryId,
        manufacturer: ManufacturerId,
        price: Price,
        cost: Cost,
        minQty: MinQty,
        description: Description
      });
    },
    setComboProducts: (products) => {
      console.log('....................', ComboProductForm)
      ComboProductForm && ComboProductForm.setProducts(products);
    }
  }));


  const handleOnChangeFile = ({ file }) => {
    const { originFileObj } = file || {};

    const reader = new FileReader();
    reader.readAsDataURL(originFileObj);

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  const handleSubmit = () => {
    validateFields().then((value) => {
      const comboProducts = comboProductForm && comboProductForm.getComboProducts();
      onSubmit({ ...value, comboProducts, resetFields })
    })
    .catch(() => { });
  }

  const handleOnChangeType = (type) => {
    setProductType(type)
  }

  return (
    <div>
      <Modal
        width='70%'
        {...rest}
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={() => {
          onClose();
          resetFields();
          setProductType(PRODUCT_TYPE.STANDARD);
        }}>
        <Upload
          listType="picture-card"
          className="avatar-uploader"
          onChange={handleOnChangeFile}
          showUploadList={false}>
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <Form
          layout='vertical'
          colon={false}
          hideRequiredMark={true}
          form={form}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}>
            <div style={{ width: '49%' }}>
              <Form.Item
                {...formItem}
                name='name'
                rules={[{ required: true, message: 'Enter Product name' }]}>
                <Input
                  placeholder='Enter name'
                  addonBefore='Name'
                />
              </Form.Item>
            </div>
            <div style={{ width: '25%' }}>
              <Group compact>
                <Input
                  value='Type'
                  style={{ ...addonStyle, width: '60px' }}
                  disabled
                />
                <Form.Item
                  {...formItem}
                  name='type'
                  style={{ ...formItem.style, width: 'calc(100% - 60px)' }}
                  initialValue={PRODUCT_TYPE.STANDARD}
                  rules={[{ required: true, message: 'Enter product type' }]}>
                  <Select
                    placeholder='Select Product type'
                    onChange={handleOnChangeType}>
                    <Option value={PRODUCT_TYPE.STANDARD} key={PRODUCT_TYPE.STANDARD} title='Standard'>Standard</Option>
                    <Option value={PRODUCT_TYPE.COMBO} key={PRODUCT_TYPE.COMBO} title='Standard'>Combo</Option>
                    <Option value={PRODUCT_TYPE.SERVICE} key={PRODUCT_TYPE.SERVICE} title='Standard'>Service</Option>
                  </Select>
                </Form.Item>
              </Group>
            </div>
            <div style={{ width: '25%' }}>
              <Form.Item
                {...formItem}
                name='code'>
                <Input
                  placeholder='Enter a unique Product code'
                  addonBefore='Code'
                />
              </Form.Item>
            </div>
            <div style={{ width: '49%' }}>
              <Group compact>
                <Input
                  value='Category'
                  style={{ ...addonStyle, width: '80px' }}
                  disabled
                />
                <Form.Item
                  {...formItem}
                  name='category'
                  style={{ ...formItem.style, width: 'calc(100% - 80px)' }}
                  rules={[{ required: true, message: 'Enter Category' }]}>
                  <Select
                    placeholder='Select Category'
                    showSearch
                    optionFilterProp='children'>
                    {categoryOptions}
                  </Select>
                </Form.Item>
              </Group>
            </div>
            <div style={{ width: '50.5%' }}>
              <Group compact>
                <Input
                  value='Manufacturer'
                  style={{ ...addonStyle, width: '110px' }}
                  disabled
                />
                <Form.Item
                  {...formItem}
                  name='manufacturer'
                  style={{ ...formItem.style, width: 'calc(100% - 110px)' }}>
                  <Select
                    placeholder='Select Manufacturer'
                    showSearch
                    allowClear
                    optionFilterProp='children'>
                    {manufacturerOptions}
                  </Select>
                </Form.Item>
              </Group>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}>
            <div style={{ width: '33%' }}>
              <Group compact>
                <Input
                  value='Price'
                  style={{ ...addonStyle, width: '60px' }}
                  disabled
                />
                <Form.Item
                  {...formItem}
                  name='price'
                  style={{ ...formItem.style, width: 'calc(100% - 60px)' }}
                  rules={[{ required: true, message: 'Enter Price' }]}>
                  <InputNumber placeholder='Enter Price' style={{ width: '100%' }} />
                </Form.Item>
              </Group>
            </div>
            {
              productType == PRODUCT_TYPE.STANDARD
              && (
                <>
                  <div style={{ width: '33%' }}>
                    <Group compact>
                      <Input
                        value='Cost'
                        style={{ ...addonStyle, width: '60px' }}
                        disabled
                      />
                      <Form.Item
                        name='cost'
                        {...formItem}
                        style={{ ...formItem.style, width: 'calc(100% - 60px)' }}>
                        <InputNumber placeholder='Enter Cost' style={{ width: '100%' }} />
                      </Form.Item>
                    </Group>
                  </div>
                  <div style={{ width: '33%' }}>
                    <Group compact>
                      <Input
                        value='Minimun Qty.'
                        style={{ ...addonStyle, width: '110px' }}
                        disabled
                      />
                      <Form.Item
                        name='minQty'
                        {...formItem}
                        style={{ ...formItem.style, width: 'calc(100% - 110px)' }}>
                        <InputNumber placeholder='Enter Min Qty' style={{ width: '100%' }} />
                      </Form.Item>
                    </Group>
                  </div>
                </>
              )
            }
          </div>
          <Form.Item
            {...formItem}
            name='description'>
            <TextArea placeholder='Enter Product Description...' />
          </Form.Item>
        </Form>
        {(productType == PRODUCT_TYPE.COMBO) && <ComboProductForm {...rest} ref={(ref) => comboProductForm = ref} />}
      </Modal>
    </div>
  )
}

export default forwardRef(AddProduct);
