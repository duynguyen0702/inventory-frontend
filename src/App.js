// Import các thành phần từ React và Material UI
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Import các component con và API
import ProductList from "./components/ProductList";
import ImportOrderForm from "./components/ImportOders/ImportOrderForm";
import ImportOrderList from "./components/ImportOders/ImportOrderList";
import ExportOrderForm from "./components/ExportOrderForm";
import ExportOrderList from "./components/ExportOrderList";
import { createExportOrder } from "./api";

function App() {
  // State cho Snackbar thông báo
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  // Trigger để render lại danh sách khi có cập nhật
  const [importTrigger, setImportTrigger] = React.useState(0);
  const [exportTrigger, setExportTrigger] = React.useState(0);
  const [productsTrigger, setProductsTrigger] = React.useState(0);

  // State mở/đóng dialog tạo đơn
  const [openImportDialog, setOpenImportDialog] = React.useState(false);
  const [openExportDialog, setOpenExportDialog] = React.useState(false);

  // Hàm xử lý khi tạo đơn nhập thành công
  const handleImportOrderSuccess = () => {
    setSnackbarMessage("Import order created successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setImportTrigger((prev) => prev + 1); // Cập nhật danh sách đơn nhập
    setProductsTrigger((prev) => prev + 1); // Cập nhật danh sách sản phẩm
    setOpenImportDialog(false); // Đóng dialog
  };

  // Hàm xử lý khi tạo đơn xuất thành công
  const handleExportOrderSuccess = () => {
    setSnackbarMessage("Export order created successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setExportTrigger((prev) => prev + 1); // Cập nhật danh sách đơn xuất
    setProductsTrigger((prev) => prev + 1); // Cập nhật danh sách sản phẩm
    setOpenExportDialog(false); // Đóng dialog
  };

  // Hàm xử lý khi có lỗi xảy ra
  const handleError = (message) => {
    setSnackbarMessage(message || "Something went wrong!");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  // Đóng Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        padding: 2,
        backgroundColor: "#eef2f6",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tiêu đề chính */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        color="primary"
      >
        Inventory Management
      </Typography>

      {/* Các nút hành động tạo đơn */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenImportDialog(true)}
        >
          + Import Order
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenExportDialog(true)}
        >
          + Export Order
        </Button>
      </Box>

      {/* Giao diện 3 cột: đơn nhập, đơn xuất, danh sách sản phẩm */}
      <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
        {/* Cột 1: Danh sách đơn nhập */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={3}
            sx={{ padding: 2, borderRadius: 3, height: "100%" }}
          >
            <Section title="Import Order List - Don dat hang">
              <ImportOrderList
                trigger={importTrigger} // Render lại khi trigger thay đổi
                setProductsTrigger={setProductsTrigger}
                onChange={() => setImportTrigger((prev) => prev + 1)}
              />
            </Section>
          </Paper>
        </Box>

        {/* Cột 2: Danh sách đơn xuất */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={3}
            sx={{ padding: 2, borderRadius: 3, height: "100%" }}
          >
            <Section title="Export Order List">
              <ExportOrderList trigger={exportTrigger} />
            </Section>
          </Paper>
        </Box>

        {/* Cột 3: Danh sách sản phẩm */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={3}
            sx={{ padding: 2, borderRadius: 3, height: "100%" }}
          >
            <Section title="Product List">
              <ProductList trigger={productsTrigger} />
            </Section>
          </Paper>
        </Box>
      </Box>

      {/* Hộp thoại tạo đơn nhập */}
      <Dialog
        open={openImportDialog}
        onClose={() => setOpenImportDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Import Order</DialogTitle>
        <DialogContent>
          <ImportOrderForm
            onSuccess={handleImportOrderSuccess} // Gọi khi thành công
            onError={handleError} // Gọi khi có lỗi
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImportDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Hộp thoại tạo đơn xuất */}
      <Dialog
        open={openExportDialog}
        onClose={() => setOpenExportDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Export Order</DialogTitle>
        <DialogContent>
          <ExportOrderForm
            createExportOrder={createExportOrder} // Gọi API tạo đơn xuất
            onSuccess={handleExportOrderSuccess}
            onError={(msg) =>
              handleError(msg || "Failed to create export order!")
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExportDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar hiển thị thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity} // success hoặc error
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Component con hiển thị tiêu đề và nội dung (dùng cho mỗi khu vực danh sách)
function Section({ title, children }) {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h6"
        gutterBottom
        color="text.secondary"
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
}

export default App;
