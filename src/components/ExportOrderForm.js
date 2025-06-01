import React, { useState } from 'react';
import { Paper, Typography, TextField, Box, Button } from '@mui/material';

const ExportOrderForm = ({ createExportOrder, onSuccess, onError }) => {
  const [code, setCode] = useState('');
  const [items, setItems] = useState([{ productCode: '', productName: '', quantity: 1 }]);

  const handleChangeItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { productCode: '', productName: '', quantity: 1 }]);
  };

  const handleSubmit = async () => {
    try {
      await createExportOrder({ code, items });
      setCode('');
      setItems([{ productCode: '', productName: '', quantity: 1 }]);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError('Failed to create export order');
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
      <TextField
        label="Order Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      {items.map((item, idx) => (
        <Box key={idx} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Code"
            value={item.productCode}
            onChange={(e) => handleChangeItem(idx, 'productCode', e.target.value)}
            fullWidth
          />
          <TextField
            label="Name"
            value={item.productName}
            onChange={(e) => handleChangeItem(idx, 'productName', e.target.value)}
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={item.quantity}
            onChange={(e) => handleChangeItem(idx, 'quantity', e.target.value)}
            fullWidth
          />
        </Box>
      ))}
      <Button onClick={addItem} variant="outlined" sx={{ mr: 2 }}>
        + Add
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit 
      </Button>
    </Paper>
  );
};

export default ExportOrderForm;