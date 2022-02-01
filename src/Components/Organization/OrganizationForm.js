import "../../Components/FormStyles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Container, TextField, Box, Button, Input, Icon } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useEffect, useState } from "react";

const OrganizationForm = () => {
  const [logo, setLogo] = useState("");
  const [previewLogo, setPreviewLogo] = useState(null);

  useEffect(() => {
    if (!logo) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewLogo(reader.result);
    };
    reader.readAsDataURL(logo);
  }, [logo]);

  const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El campo nombre es obligatorio."),

    shortDescription: Yup.string().required(
      "El campo descripción es obligatorio."
    ),

    longDescription: Yup.string()
      .min(1)
      .max(150, "No se pueden exceder los 150 caracteres.")
      .required("El campo descripción extendida es obligatorio."),

    logo: Yup.mixed()
      .required("ingrese una imagen para el logo.")
      .test(
        "fileType",
        "Formato incorrecto. Sólo se aceptan archivos .jpg, .jpeg, .png",
        (value) => {
          if (value) return SUPPORTED_FORMATS.includes(value.type);
        }
      ),
    facebookUrl: Yup.string()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
        "Ingrese un una direccion url correcta."
      )
      .required("Ingresar al menos un link de redes sociales"),
    instagramUrl: Yup.string()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?instagram.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
        "Ingrese un una direccion url correcta."
      )
      .required("Ingresar al menos un link de redes sociales"),
    twitterUrl: Yup.string()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?twitter.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
        "Ingrese un una direccion url correcta."
      )
      .required("Ingresar al menos un link de redes sociales"),
    linkedinUrl: Yup.string()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
        "Ingrese un una direccion url correcta."
      )
      .required("Ingresar al menos un link de redes sociales"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: "",
        logo: "",
        shortDescription: "",
        longDescription: "Ingrese una descripción extendida de la organización",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        linkedinUrl: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        // acá se hace el envío de datos
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        setFieldValue,
        touched,
      }) => (
        <Container>
          <Box sx={{ boxShadow: 5, p: 5, mt: 2 }}>
            <h1>Cambiar datos de Organización</h1>

            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                name="name"
                label="Nombre de la Organización"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onBlur={handleBlur}
              />
              <TextField
                margin="normal"
                fullWidth
                id="shortDescription"
                name="shortDescription"
                label="Descripción breve"
                value={values.shortDescription}
                onChange={handleChange}
                error={
                  touched.shortDescription && Boolean(errors.shortDescription)
                }
                helperText={touched.shortDescription && errors.shortDescription}
                onBlur={handleBlur}
              />
              <CKEditor
                name="longDescription"
                editor={ClassicEditor}
                data={values.longDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("longDescription", data);
                }}
              />
              <ErrorMessage component="small" name="longDescription" />

              <label htmlFor="logo">
                <Input
                  name="logo"
                  accept="image/*"
                  id="logo"
                  multiple
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setFieldValue("logo", file);
                    setLogo(file);
                  }}
                  style={{ display: "none" }}
                />

                <Button fullWidth variant="outlined" component="span">
                  Seleccionar nuevo logo.
                </Button>
                <ErrorMessage component="small" name="logo" />
              </label>

              {previewLogo ? (
                <img style={{ maxWidth: "100%" }} src={previewLogo} alt="" />
              ) : null}

              <TextField
                InputProps={{ startAdornment: <FacebookIcon /> }}
                fullWidth
                variant="standard"
                margin="normal"
                id="facebookUrl"
                name="facebookUrl"
                label="Link facebook"
                value={values.facebookUrl}
                onChange={handleChange}
                error={touched.facebookUrl && Boolean(errors.facebookUrl)}
                helperText={touched.facebookUrl && errors.facebookUrl}
                onBlur={handleBlur}
              />

              <TextField
                InputProps={{ startAdornment: <InstagramIcon /> }}
                fullWidth
                variant="standard"
                margin="normal"
                id="instagramUrl"
                name="instagramUrl"
                label="Link instagram"
                value={values.instagramUrl}
                onChange={handleChange}
                error={touched.instagramUrl && Boolean(errors.instagramUrl)}
                helperText={touched.instagramUrl && errors.instagramUrl}
                onBlur={handleBlur}
              />

              <TextField
                InputProps={{ startAdornment: <TwitterIcon /> }}
                fullWidth
                variant="standard"
                margin="normal"
                id="twitterUrl"
                name="twitterUrl"
                label="Link twitter"
                value={values.twitterUrl}
                onChange={handleChange}
                error={touched.twitterUrl && Boolean(errors.twitterUrl)}
                helperText={touched.twitterUrl && errors.twitterUrl}
                onBlur={handleBlur}
              />

              <TextField
                InputProps={{ startAdornment: <LinkedInIcon /> }}
                fullWidth
                variant="standard"
                margin="normal"
                id="linkedinUrl"
                name="linkedinUrl"
                label="Link linkedin"
                value={values.linkedinUrl}
                onChange={handleChange}
                error={touched.linkedinUrl && Boolean(errors.linkedinUrl)}
                helperText={touched.linkedinUrl && errors.linkedinUrl}
                onBlur={handleBlur}
              />

              <Button type="submit" variant="contained" fullWidth>
                Confirmar Edición
              </Button>
            </form>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default OrganizationForm;
