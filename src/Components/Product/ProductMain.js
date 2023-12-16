import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./ProductMain.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import uuid from "react-uuid";
import SpecificationTable from "../Specification/SpecificationTable";
import ProductList from "../ProductList/ProductList";
import ImagePreview from "../ImagePreview/ImagePreview";
import { useForm } from "react-hook-form";

export default function ProductMain() {
  const [isSubmitSuccessful, setisSubmitSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [productObj, setProductObj] = useState({
    prodctId: "",
    producName: "",
    productCode: "",
    brand: "",
    category: {
      phone: false,
      laptop: false,
      clothing: false,
    },
    price: undefined,
    image: undefined,
    emptyImage: "",
    SpecificationsList: [],
    manufact_date: null,
    FY: null,
    isEdit: false,
  });

  const [productSpeckeyValueObj, setProductSpecKeyValue] = useState({
    productSpecId: "",
    productSpecKey: "",
    ProductSpecValue: "",
  });

  const [porductList, setProductList] = useState([]);

  ////////// product details start set details

  ///// common on change
  const productDetailsOnHandleChange = (e) => {
    if (e.target.name === "price") {
      //   if ( parseInt(e.target.value)>0) {
      productObj[e.target.name] = e.target.value;
      //   }
    } else if (e.target.name !== "price") {
      productObj[e.target.name] = e.target.value;
    }

    setProductObj({ ...productObj });
  };

  ///// check box on change
  const checkBoxHandleOnChange = (e) => {
    productObj.category[e.target.name] = e.target.checked;
    setProductObj({ ...productObj });
  };

  ///////// image on change
  const fileUploadHandelOnChange = (e) => {
    const { name, value, files } = e.target;

    const selectedImage = files[0];

    // Check file type (jpeg, jpg, png)
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (selectedImage && allowedFileTypes.includes(selectedImage.type)) {
      // Read the image and set the preview
      const reader = new FileReader();

      reader.onloadend = () => {
        setProductObj((prevProductObj) => ({
          ...prevProductObj,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  /////// Product Specification state onchaage and add and list start

  const handleProductKyeValueChange = (e) => {
    productSpeckeyValueObj[e.target.name] = e.target.value;
    setProductSpecKeyValue({ ...productSpeckeyValueObj });
  };

  const addProductSpecification = () => {
    if (
      productSpeckeyValueObj.productSpecKey &&
      productSpeckeyValueObj.ProductSpecValue
    ) {
      productSpeckeyValueObj.productSpecId = uuid();

      productObj.SpecificationsList.push({
        productSpecId: productSpeckeyValueObj.productSpecId,
        productSpecKey: productSpeckeyValueObj.productSpecKey,
        ProductSpecValue: productSpeckeyValueObj.ProductSpecValue,
      });
      setProductObj({ ...productObj });

      productSpeckeyValueObj.productSpecId = "";
      productSpeckeyValueObj.productSpecKey = "";
      productSpeckeyValueObj.ProductSpecValue = "";
      setProductSpecKeyValue({ ...productSpeckeyValueObj });
    }
  };

  /////// Product Specification end

  // date select on chage
  const handleDateChange = (newDate) => {
    productObj.manufact_date = newDate;
    setProductObj({ ...productObj });
  };

  ///////////end product set details

  ///// save product

  const saveProdct = (productObj) => {
    console.log(productObj);

    if (productObj.isEdit) {
      let obj = porductList.find((item) => {
        return item.prodctId === productObj.prodctId;
      });

      obj.producName = productObj.producName;
      obj.productCode = productObj.productCode;
      obj.brand = productObj.brand;
      obj.price = productObj.price;
      obj.image = productObj.image;
      obj.SpecificationsList = productObj.SpecificationsList;
      obj.manufact_date = productObj.manufact_date;
      obj.FY = productObj.FY;

      setProductList([...porductList]);
      setisSubmitSuccessful(true);
    } else {
      productObj.prodctId = uuid();
      setProductList([...porductList, { ...productObj }]);
      reset();
    }
  };

  ///// save product

  const editProduct = (productObj) => {
    console.log("edit method", productObj);
    setValue("producName", productObj.producName);
    setValue("productCode", productObj.productCode);
    setValue("brand", productObj.brand);
    setValue("phone", productObj.category.phone);
    setValue("laptop", productObj.category.laptop);
    setValue("clothing", productObj.category.clothing);
    setValue("price", productObj.price);
    setValue("image", productObj.image);
    setValue("emptyImage", productObj.emptyImage);
    setValue("SpecificationsList", productObj.SpecificationsList);
    setValue("manufact_date", productObj.manufact_date);
    setValue("FY", productObj.FY);
    setValue("isEdit", productObj.isEdit);
  };

  const deleteProduct = (porductobjdata) => {
    console.log(porductobjdata);
    const daleteData = porductList.filter((item) => {
      return item.prodctId !== porductobjdata.prodctId;
    });
    setProductList([...daleteData]);
  };

  return (
    <Box className={style.main}>
      <Paper elevation={3}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography className={style.ProductDetailsheading} variant="h6">
              Product Details
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={style.productInputs}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <form onSubmit={handleSubmit(saveProdct)}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <TextField
                    type="text"
                    name="producName"
                    // onChange={productDetailsOnHandleChange}
                    // value={productObj.producName}
                    size="small"
                    fullWidth
                    placeholder="Product Name"
                    {...register("producName", {
                      required: true,
                      maxLength: 30,
                    })}
                  ></TextField>
                  {productObj.producName}
                  {errors.producName &&
                    errors.producName.type === "required" && (
                      <span style={{ color: "red" }}>This is required</span>
                    )}
                  {errors.producName &&
                    errors.producName.type === "maxLength" && (
                      <span style={{ color: "red" }}>Max length exceeded</span>
                    )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <TextField
                    type="text"
                    name="productCode"
                    onChange={productDetailsOnHandleChange}
                    // value={productObj.productCode}
                    size="small"
                    fullWidth
                    placeholder="Product Code"
                    {...register("productCode", { required: true })}
                  ></TextField>
                  {errors.productCode &&
                    errors.productCode.type === "required" && (
                      <span style={{ color: "red" }}>This is required</span>
                    )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={productObj.brand}
                      label="Brand"
                      name="brand"
                      onChange={productDetailsOnHandleChange}
                      {...register("brand", { required: true })}
                    >
                      <MenuItem value={"apple"}>apple</MenuItem>
                      <MenuItem value={"mi"}>mi</MenuItem>
                      <MenuItem value={"oppo"}>oppo</MenuItem>
                    </Select>
                    {errors.brand && errors.brand.type === "required" && (
                      <span style={{ color: "red" }}>This is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <FormGroup>
                    <Stack direction={"row"}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={productObj.category.phone}
                            name="phone"
                            onChange={checkBoxHandleOnChange}
                            {...register("checkBox", { required: true })}
                          />
                        }
                        label="phones"
                      />
                      {errors.phone && errors.phone.type === "required" && (
                        <span style={{ color: "red" }}>This is required</span>
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={productObj.category.laptop}
                            name="laptop"
                            onChange={checkBoxHandleOnChange}
                            {...register("checkBox", { required: true })}
                          />
                        }
                        label="laptop"
                      />
                      {errors.laptop && errors.laptop.type === "required" && (
                        <span style={{ color: "red" }}>This is required</span>
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={productObj.category.clothing}
                            name="clothing"
                            onChange={checkBoxHandleOnChange}
                            {...register("checkBox", { required: true })}
                          />
                        }
                        label="Clothing"
                      />
                      {errors.checkBox &&
                        errors.checkBox.type === "required" && (
                          <span style={{ color: "red" }}>This is required</span>
                        )}
                    </Stack>
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <TextField
                    type="number"
                    name="price"
                    // onChange={productDetailsOnHandleChange}
                    // value={productObj.price}
                    size="small"
                    fullWidth
                    placeholder="Price"
                    {...register("price", { required: true })}
                  ></TextField>
                  {errors.price && errors.price.type === "required" && (
                    <span style={{ color: "red" }}>This is required</span>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <TextField
                    type="file"
                    name="image"
                    onChange={fileUploadHandelOnChange}
                    accept="image/jpeg, image/jpg, image/png"
                    size="small"
                    fullWidth
                    placeholder="upload file"
                    // value={productObj.emptyImage}
                    {...register("image", { required: true })}
                  />
                  {errors.image && errors.image.type === "required" && (
                    <span style={{ color: "red" }}>This is required</span>
                  )}
                  <Box
                    border={1}
                    borderRadius={2}
                    marginTop={2}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    {productObj.image && (
                      // <img
                      //   src={productObj.image}
                      //   alt="Preview"
                      //   style={{
                      //     maxWidth: "100%",
                      //     marginTop: "10px",
                      //     width: "100px",
                      //     height: "100px",
                      //   }}
                      // />
                      <ImagePreview
                        imageData={productObj.image}
                        style={{
                          maxWidth: "100%",
                          marginTop: "10px",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                {/* ---------------------------key value start--------------------------------------- */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <Typography variant="lable">Specification</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <Stack direction={"row"} spacing={2}>
                    <TextField
                      type="text"
                      name="productSpecKey"
                      onChange={handleProductKyeValueChange}
                      value={productSpeckeyValueObj.productSpecKey}
                      size="small"
                      placeholder="Key"
                    />
                    <TextField
                      type="text"
                      name="ProductSpecValue"
                      onChange={handleProductKyeValueChange}
                      value={productSpeckeyValueObj.ProductSpecValue}
                      size="small"
                      placeholder="value"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addProductSpecification}
                    >
                      Add
                    </Button>
                  </Stack>
                  <Box sx={{ paddingTop: "30px" }} className={style.specTable}>
                    <SpecificationTable
                      SpecificationList={productObj.SpecificationsList}
                    />
                  </Box>
                </Grid>
                {/* ---------------------------key value end--------------------------------------- */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      //   name="dateinp"
                      onChange={handleDateChange}
                      //    value={productObj.manufact_date}

                      //   {...register("dateinp", { required: true })}
                    />
                  </LocalizationProvider>
                  {/* {errors.dateinp &&
                    errors.dateinp.type === "required" && (
                      <span style={{ color: "red" }}>This is required</span>
                    )} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue={productObj.FY}
                      name="FY"
                      //    value={productObj.FY}
                      onChange={productDetailsOnHandleChange}
                    >
                      <Stack direction={"row"}>
                        <FormControlLabel
                          value="new"
                          name="FY"
                          control={<Radio />}
                          label="new F.Y product"
                          {...register("FY", { required: true })}
                        />
                        <FormControlLabel
                          name="FY"
                          value="old"
                          control={<Radio />}
                          label="old F.Y product"
                          {...register("FY", { required: true })}
                        />
                      </Stack>
                    </RadioGroup>
                    {errors.FY && errors.FY.type === "required" && (
                      <span style={{ color: "red" }}>This is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={style.InputBox}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    //   onClick={saveProdct}
                    type="submit"
                  >
                    save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Paper elevation={2} border={1}>
              <ProductList
                productList={porductList}
                editProduct={editProduct}
                deleteProduct={deleteProduct}
              />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
