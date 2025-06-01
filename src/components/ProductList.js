import { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

export default function ProductList({ trigger }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetchProducts();
        const data = Array.isArray(res) ? res : res?.data || [];
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchList();
  }, [trigger]);

  return (
    <Box>
      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Qty
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.code} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.code}</TableCell>
                <TableCell align="right">{p.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <Box p={2}>
          <Typography color="text.secondary" align="center">
            No products found.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
