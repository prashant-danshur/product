import { Box } from "@mui/material";
import React from "react";

export default function SpecificationTable(props) {
  const { SpecificationList } = props;

  return (
    <Box>
      <table>
        <thead>
          <tr>
            <th>Product Specification Key</th>
            <th>Product Specification Value</th>
          </tr>
        </thead>
        <tbody>
          {SpecificationList?.map((item) => {
            return (
              <tr key={item.productSpecId + "-" + item.productSpecKey}>
                <td>{item.productSpecKey} </td>
                <td>{item.ProductSpecValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}
