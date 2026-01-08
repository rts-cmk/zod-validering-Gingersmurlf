import z from "zod";

const minDate = new Date("1900-01-01");

const RegistrationFormSchema = z
  .object({
    firstName: z.string().min(1, "Fornavn skal være mindst 1 tegn langt"),
    lastName: z.string().min(1, "Efternavn skal være mindst 1 tegn langt"),
    email: z.email("Email skal være gyldig"),
    password: z
      .string()
      .min(8, "Adgangskode skal minimum være 8 tegn langt")
      .max(20, "Adgangskode skal maksimum være 20 tegn langt")
      .regex(/[a-zæøå]/, "Adgangskode skal indeholde mindst et lille bogstav")
      .regex(/[A-ZÆØÅ]/, "Adgangskode skal indeholde mindst et stort bogstav")
      .regex(/[\d]/, "Adgangskode skal indeholde mindst et tal")
      .regex(/[\W]/, "Adgangskode skal indeholde mindst et specialtegn"),
    confirmPassword: z.string().nonempty("Du skal gentage adgangskoden"),
    birthdate: z
      .string()
      .refine((val) => val !== "", {
        message: "Vælg din fødselsdato",
      })
      .transform((value) => new Date(value))
      .pipe(
        z
          .date({
            invalid_type_error: "Indtast en gyldig dato",
          })
          .refine((date) => date >= minDate, {
            message: "Fødselsdato skal være efter 01-01-1900.",
          })
          .refine(
            (birthDate) => {
              const today = new Date();

              const eighteenYearsAgo = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate(),
              );

              return birthDate <= eighteenYearsAgo;
            },
            {
              message: "Du skal være over 18 år!",
            },
          ),
      ),
    phoneNumber: z
      .string()
      .refine(
        (val) =>
          val === "" || /^([+]{1}\d{1,3}|00\d{1,3}|)?[\d\s]{8,25}$/.test(val),
        {
          message: "Telefonnummer er ikke gyldigt",
        },
      )
      .optional(),
    username: z
      .string()
      .nonempty("Brugernavn skal udfyldes")
      .regex(/[aA-zZ\d_]/, "Du må kun bruge bogstaver, tal og underscore"),
    postalCode: z.string().regex(/^[0-9]{4}$/, "Postnummer skal være 4 cifre"),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    path: ["confirmPassword"],
    message: "Adgangskoden matcher ikke!",
  });

export default RegistrationFormSchema;
