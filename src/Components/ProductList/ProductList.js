import React, { memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ImagePreview from "../ImagePreview/ImagePreview";
import { format, parseISO } from "date-fns";
import { Button } from "@mui/material";

const imageStyle = {
  maxWidth: "100%",
  marginTop: "10px",
  width: "40px",
  height: "30px",
};

const ProductList = ({ productList, editProduct, deleteProduct }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Code</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Manufacturing Date</TableCell>
            <TableCell>FY</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.productId}>
              <TableCell>
                <ImagePreview imageData={product.image} style={imageStyle} />
              </TableCell>
              <TableCell>{product.producName}</TableCell>
              <TableCell>{product.productCode}</TableCell>
              <TableCell>{product.brand}</TableCell>
              {/* <TableCell>
                {Object.keys(product.category)
                  .filter((key) => product.category[key])
                  .join(", ")}
              </TableCell> */}
              <TableCell>{product.price}</TableCell>
              {/* <TableCell>
                {product.manufact_date
                  ? format(new Date(product.manufact_date), "MM/dd/yyyy")
                  : "N/A"}
              </TableCell> */}
              <TableCell>{product.FY}</TableCell>
              <TableCell>
                <IconButton color="primary" aria-label="edit">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      editProduct(product);
                    }}
                  >
                    Edit
                  </Button>
                </IconButton>
                <IconButton color="secondary" aria-label="delete">
                  <Button
                    size="delete"
                    color="error"
                    variant="contained"
                    onClick={() => {
                      deleteProduct(product);
                    }}
                  >
                    Delete
                  </Button>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(ProductList);
