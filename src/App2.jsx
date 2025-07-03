import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SCHEMA } from "./schema";
import { schemaFull } from "./schemaFull";

// TODO: Import your full schema here
const mockSchema = {
  modules: [
    {
      moduleId: "module-001",
      name: "Risk Management Module",
      enabled: true,
      forms: [
        {
          formId: "form-001",
          title: "Risk Assessment Form",
          enabled: true,
          formFields: [
            {
              formFieldId: "field-text-1",
              name: "Risk Title",
              type: "text",
              required: true,
              placeholder: "Enter risk title",
            },
            {
              formFieldId: "field-select-1",
              name: "Risk Category",
              type: "select",
              required: true,
              options: [
                { optionId: "opt-1", label: "Operational Risk" },
                { optionId: "opt-2", label: "Financial Risk" },
              ],
              conditionalFields: [
                {
                  enableOnValue: "opt-1",
                  field: {
                    formFieldId: "conditional-1",
                    name: "Process Affected",
                    type: "text",
                    required: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Zod schema builder - TODO: Make this dynamic based on form fields
const createFormSchema = (formFields) => {
  const schemaObject = {};

  formFields.forEach((field) => {
    let fieldSchema = z.string();

    if (field.type === "number") {
      fieldSchema = z.number();
    } else if (field.type === "checkbox") {
      fieldSchema = z.boolean();
    } else if (field.type === "multiselect") {
      fieldSchema = z.array(z.string());
    }
    // TODO: Add more field type validations

    if (!field.required) {
      fieldSchema = fieldSchema.optional();
    }

    schemaObject[field.formFieldId] = fieldSchema;

    // TODO: Add conditional field schemas
  });

  return z.object(schemaObject);
};

const FieldRenderer = ({ field, control, watch }) => {
  const watchedValues = watch();

  // Check if field should be shown (conditional logic)
  const shouldShow = () => {
    // TODO: Implement conditional field logic
    return true;
  };

  if (!shouldShow()) return null;

  const commonProps = {
    name: field.formFieldId,
    control,
    rules: { required: field.required },
  };

  switch (field.type) {
    case "text":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{field.name}</label>
          <Controller
            {...commonProps}
            render={({ field: { onChange, value } }) => (
              <input
                type="text"
                value={value || ""}
                onChange={onChange}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded"
              />
            )}
          />
        </div>
      );

    case "textarea":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{field.name}</label>
          <Controller
            {...commonProps}
            render={({ field: { onChange, value } }) => (
              <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded h-24"
              />
            )}
          />
        </div>
      );

    case "select":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{field.name}</label>
          <Controller
            {...commonProps}
            render={({ field: { onChange, value } }) => (
              <select
                value={value || ""}
                onChange={onChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {field.options?.map((option) => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          {/* TODO: Render conditional fields based on selected value */}
        </div>
      );

    case "multiselect":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{field.name}</label>
          {/* TODO: Implement multiselect component */}
          <div className="text-gray-500">Multiselect component placeholder</div>
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-4">
          <Controller
            {...commonProps}
            render={({ field: { onChange, value } }) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={value || false}
                  onChange={onChange}
                  className="mr-2"
                />
                {field.name}
              </label>
            )}
          />
        </div>
      );

    case "radio":
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{field.name}</label>
          <Controller
            {...commonProps}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                {field.options?.map((option) => (
                  <label key={option.optionId} className="flex items-center">
                    <input
                      type="radio"
                      value={option.optionId}
                      checked={value === option.optionId}
                      onChange={onChange}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          />
        </div>
      );

    // TODO: Implement remaining field types:
    // - radiogroup with subOptions
    // - file
    // - date with validations
    // - nodeselect
    // - number

    default:
      return (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <div className="text-sm text-gray-600">
            Field type "{field.type}" not implemented yet
          </div>
          <div className="font-medium">{field.name}</div>
        </div>
      );
  }
};

const FormRenderer = ({ form }) => {
  const sortedFields = form.formFields
    .filter((field) => field.enabled)
    .sort((a, b) => a.order - b.order);

  const formSchema = createFormSchema(sortedFields);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // TODO: Handle form submission
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">{form.title}</h3>
      {form.description && (
        <p className="text-gray-600 mb-6">{form.description}</p>
      )}

      <div className="space-y-4">
        {sortedFields.map((field) => (
          <FieldRenderer
            key={field.formFieldId}
            field={field}
            control={control}
            watch={watch}
          />
        ))}

        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {/* TODO: Display form errors */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 p-4 bg-red-50 rounded">
          <div className="text-red-800">Form has errors</div>
        </div>
      )}
    </div>
  );
};

const ModuleRenderer = ({ module }) => {
  const enabledForms = module.forms
    .filter((form) => form.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{module.name}</h2>
      <div className="space-y-6">
        {enabledForms.map((form) => (
          <FormRenderer key={form.formId} form={form} />
        ))}
      </div>
    </div>
  );
};

export default function DynamicFormRenderer() {
  const [schema] = useState(schemaFull); // TODO: Load your actual schema
  const [selectedModule, setSelectedModule] = useState(null);

  const enabledModules = schema.modules
    .filter((module) => module.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Dynamic Form System</h1>

      {/* Module Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Module</h2>
        <div className="flex flex-wrap gap-2">
          {enabledModules.map((module) => (
            <button
              key={module.moduleId}
              onClick={() => setSelectedModule(module)}
              className={`px-4 py-2 rounded ${
                selectedModule?.moduleId === module.moduleId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {module.name}
            </button>
          ))}
        </div>
      </div>

      {/* Render Selected Module */}
      {selectedModule ? (
        <ModuleRenderer module={selectedModule} />
      ) : (
        <div className="text-gray-500 text-center py-12">
          Select a module to view its forms
        </div>
      )}

      {/* TODO: Add organizational hierarchy renderer */}
      {/* TODO: Add risk types renderer */}
    </div>
  );
}
