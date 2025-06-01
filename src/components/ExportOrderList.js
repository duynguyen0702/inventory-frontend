import React, { useEffect, useState } from "react";
import { fetchExportOrders } from "../api";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";

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

export default function ExportOrderList({ trigger }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchExportOrders();
        const data = Array.isArray(res) ? res : res?.data || [];
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch export orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [trigger]);

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ p: 2 }}>
        <List disablePadding>
          {orders.map(({ _id, code, status, items }) => (
            <React.Fragment key={_id}>
              <ListItem disableGutters sx={{ alignItems: "flex-start", px: 1, py: 1 }}>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2" fontWeight="bold">
                       <Typography component="span" fontWeight="bold" color="primary">
                          {code} {" "}
                          <Typography variant="caption" sx={{ color: getStatusColor(status), fontWeight: "bold" }}>
                        {status}
                      </Typography>
                        </Typography>
                      </Typography>
                      
                    </Box>
                  }
                  secondary={
                    <Box mt={0.5}>
                      {items.map((item, idx) => (
                        <Typography key={idx} variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {item.productName} ({item.productCode}) – Qty: {item.quantity}, Exported: {item.exported}
                        </Typography>
                      ))}
                    </Box>
                  }
                />
              </ListItem>
              <Divider component="li" sx={{ mx: 1 }} />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
