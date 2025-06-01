import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState } from "react";
import {
  fetchImportOrders,
  updateImportOrder,
  deleteImportOrder,
} from "../../api";
import DataTable from "./TableOrder";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "doing":
      return "red";
    case "done":
      return "green";
    default:
      return "gray";
  }
};

export default function ImportOrderList({ trigger, setProductsTrigger }) {
  // luu danh sach orders ma server
  const [orders, setOrders] = useState([]);
  // tat bat popup
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedItems, setEditedItems] = useState([]);

  // ham goi lai cho ca update va delete, lam moi data
  const fetchOrders = async () => {
    try {
      const res = await fetchImportOrders();
      console.log("res",res);
      const data = Array.isArray(res) ? res : res?.data || [];
      setOrders(data);
      setProductsTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch import orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [trigger]);

  const openEditDialog = (order) => {
    setEditingOrder(order);
    const items = order.items.map((item) => ({
      productCode: item.productCode,
      productName: item.productName,
      quantity: 0,
    }));
    setEditedItems(items);
  };

  const handleCancel = () => {
    setEditingOrder(null);
    setEditedItems([]);
  };

  const handleSave = async () => {
    try {
      const formattedItems = editedItems.map((item) => ({
        productCode: item.productCode,
        quantity: parseInt(item.quantity, 10) || 0,
      }));
      await updateImportOrder({
        code: editingOrder.code,
        items: formattedItems,
      });

      setEditingOrder(null);
      setEditedItems([]);
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteImportOrder({ _id: orderId });
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order", err);
    }
  };

  const handleChangeItem = (index, field, value) => {
    const newItems = [...editedItems];
    newItems[index][field] =
      field === "quantity" ? value.replace(/\D/g, "") : value;
    setEditedItems(newItems);
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <CardContent sx={{ p: 2 }}>
          <List disablePadding>
            {orders.map((order) => (
              <Box key={order._id} sx={{ mb: 2 }}>
                <ListItem
                  disableGutters
                  sx={{ alignItems: "flex-start", px: 1, py: 1 }}
                  secondaryAction={
                    <>
                      <IconButton onClick={() => openEditDialog(order)}>
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(order._id)}>
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          <Typography
                            component="span"
                            fontWeight="bold"
                            color="primary"
                          >
                            {order.code}{" "}
                            <Typography
                              variant="caption"
                              sx={{
                                color: getStatusColor(order.status),
                                fontWeight: "bold",
                              }}
                            >
                              {order.status}
                            </Typography>
                          </Typography>
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box mt={1}>
                        {order.items.map((item, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            color="text.secondary"
                          >
                            {item.productName} ({item.productCode}) — Required:{" "}
                            {item.quantity}, Received: {item.received}
                          </Typography>
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
                <Divider sx={{ mx: 1 }} />
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Dialog popup */}
      <Dialog
        open={!!editingOrder}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Import Order: {editingOrder?.code}</DialogTitle>
        <DialogContent dividers>
          {editedItems.map((item, idx) => (
            <Box key={idx} sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                size="small"
                label="Product Code"
                value={item.productCode}
                InputProps={{ readOnly: true }}
                sx={{ flex: "1 1 30%" }}
              />
              <TextField
                size="small"
                label="Product Name"
                value={item.productName}
                InputProps={{ readOnly: true }}
                sx={{ flex: "1 1 40%" }}
              />
              <TextField
                size="small"
                label="Add Qty"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleChangeItem(idx, "quantity", e.target.value)
                }
                sx={{ flex: "1 1 20%" }}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>


      <DataTable />
    </>
  );
}
