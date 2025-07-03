import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, ChevronRight, HelpCircle, X } from "lucide-react";
import { schemaFull } from "./schemaFull";

// Sample schema data - replace with your actual schema
// const sampleSchema = {
//   modules: [
//     {
//       moduleId: "module-001",
//       name: "Risk Management Module",
//       enabled: true,
//       forms: [
//         {
//           formId: "form-001",
//           title: "Comprehensive Risk Assessment Form",
//           description:
//             "Complete form demonstrating all field types and conditional logic",
//           enabled: true,
//           formFields: [
//             {
//               formFieldId: "field-text",
//               name: "Risk Title",
//               placeholder: "Enter a descriptive title for the risk",
//               type: "text",
//               required: true,
//               enabled: true,
//               order: 0,
//               tooltip: {
//                 status: true,
//                 message:
//                   "Provide a clear, concise title that identifies the risk",
//               },
//             },
//             {
//               formFieldId: "field-textarea",
//               name: "Risk Description",
//               placeholder: "Detailed description of the risk scenario...",
//               type: "textarea",
//               required: true,
//               enabled: true,
//               order: 1,
//               tooltip: {
//                 status: true,
//                 message:
//                   "Describe the risk in detail, including potential causes and impacts",
//               },
//             },
//             {
//               formFieldId: "field-number",
//               name: "Financial Impact (USD)",
//               placeholder: "0",
//               type: "number",
//               required: true,
//               enabled: true,
//               order: 2,
//               tooltip: {
//                 status: true,
//                 message: "Estimated financial impact in US Dollars",
//               },
//             },
//             {
//               formFieldId: "field-select",
//               name: "Risk Category",
//               type: "select",
//               required: true,
//               enabled: true,
//               order: 3,
//               options: [
//                 { optionId: "option-operational", label: "Operational Risk" },
//                 { optionId: "option-financial", label: "Financial Risk" },
//                 { optionId: "option-strategic", label: "Strategic Risk" },
//                 { optionId: "option-compliance", label: "Compliance Risk" },
//               ],
//               tooltip: {
//                 status: true,
//                 message:
//                   "Select the primary category that best describes this risk",
//               },
//               conditionalFields: [
//                 {
//                   enableOnValue: "option-operational",
//                   field: {
//                     formFieldId: "conditional-operational",
//                     name: "Operational Process Affected",
//                     placeholder: "Which operational process is impacted?",
//                     type: "text",
//                     required: true,
//                     enabled: true,
//                     order: 4,
//                     tooltip: {
//                       status: true,
//                       message:
//                         "Specify the operational process that would be affected by this risk",
//                     },
//                   },
//                 },
//                 {
//                   enableOnValue: "option-financial",
//                   field: {
//                     formFieldId: "conditional-financial",
//                     name: "Financial Statement Impact",
//                     type: "multiselect",
//                     required: true,
//                     enabled: true,
//                     order: 4,
//                     options: [
//                       { optionId: "fs-revenue", label: "Revenue" },
//                       { optionId: "fs-expenses", label: "Expenses" },
//                       { optionId: "fs-assets", label: "Assets" },
//                       { optionId: "fs-liabilities", label: "Liabilities" },
//                     ],
//                     tooltip: {
//                       status: true,
//                       message:
//                         "Select all financial statement areas that could be impacted",
//                     },
//                   },
//                 },
//               ],
//             },
//             {
//               formFieldId: "field-multiselect",
//               name: "Affected Departments",
//               type: "multiselect",
//               required: true,
//               enabled: true,
//               order: 5,
//               options: [
//                 { optionId: "dept-finance", label: "Finance" },
//                 { optionId: "dept-hr", label: "Human Resources" },
//                 { optionId: "dept-it", label: "Information Technology" },
//                 { optionId: "dept-ops", label: "Operations" },
//                 { optionId: "dept-legal", label: "Legal & Compliance" },
//               ],
//               tooltip: {
//                 status: true,
//                 message:
//                   "Select all departments that would be affected by this risk",
//               },
//             },
//             {
//               formFieldId: "field-checkbox",
//               name: "Regulatory Implications",
//               type: "checkbox",
//               required: false,
//               enabled: true,
//               order: 6,
//               tooltip: {
//                 status: true,
//                 message:
//                   "Check if this risk has regulatory or compliance implications",
//               },
//             },
//             {
//               formFieldId: "field-radio",
//               name: "Risk Priority",
//               type: "radio",
//               required: true,
//               enabled: true,
//               order: 7,
//               options: [
//                 { optionId: "priority-low", label: "Low" },
//                 { optionId: "priority-medium", label: "Medium" },
//                 { optionId: "priority-high", label: "High" },
//                 { optionId: "priority-critical", label: "Critical" },
//               ],
//               tooltip: {
//                 status: true,
//                 message: "Select the priority level for addressing this risk",
//               },
//             },
//             {
//               formFieldId: "field-date",
//               name: "Risk Identification Date",
//               type: "date",
//               required: true,
//               enabled: true,
//               order: 10,
//               tooltip: {
//                 status: true,
//                 message: "Date when this risk was first identified",
//               },
//             },
//             {
//               formFieldId: "field-file",
//               name: "Supporting Documentation",
//               type: "file",
//               required: false,
//               enabled: true,
//               order: 9,
//               tooltip: {
//                 status: true,
//                 message:
//                   "Upload any supporting documents, reports, or evidence related to this risk",
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

const sampleSchema = schemaFull;

// Dynamic Zod schema generator
const generateZodSchema = (formFields) => {
  const schemaObject = {};

  formFields.forEach((field) => {
    let fieldSchema;
    if (!field.enabled) return;

    switch (field.type) {
      case "text":
      case "textarea":
        fieldSchema = z.string();
        if (field.required)
          fieldSchema = fieldSchema.min(1, `${field.name} is required`);
        break;

      case "number":
        fieldSchema = z.coerce.number();
        if (field.required)
          fieldSchema = fieldSchema.min(0, `${field.name} must be positive`);
        break;

      case "select":
      case "radio":
        fieldSchema = z.string();
        if (field.required)
          fieldSchema = fieldSchema.min(1, `${field.name} is required`);
        break;

      case "multiselect":
        fieldSchema = z.array(z.string());
        if (field.required)
          fieldSchema = fieldSchema.min(
            1,
            `At least one ${field.name} is required`
          );
        break;

      case "checkbox":
        fieldSchema = z.boolean();
        break;

      case "date":
        fieldSchema = z.string();

        // Add date validations if they exist
        if (field.dateValidations) {
          fieldSchema = fieldSchema.refine(
            (date) => {
              if (!date) return !field.required;

              const selectedDate = new Date(date);
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              // Check future dates rule
              if (
                field.dateValidations.allowFutureDates === false &&
                selectedDate > today
              ) {
                return false;
              }

              // Check past dates rule
              if (
                field.dateValidations.allowPastDates === false &&
                selectedDate < today
              ) {
                return false;
              }

              return true;
            },
            {
              message:
                field.dateValidations.allowFutureDates === false
                  ? `${field.name} cannot be in the future`
                  : `${field.name} cannot be in the past`,
            }
          );

          // Add greater than or equal to validation
          if (field.dateValidations.greaterOrEqualTo) {
            fieldSchema = fieldSchema.refine(
              (date, ctx) => {
                if (!date) return !field.required;

                const compareFieldValue =
                  ctx.parent[field.dateValidations.greaterOrEqualTo];
                if (!compareFieldValue) return true;

                const selectedDate = new Date(date);
                const compareDate = new Date(compareFieldValue);

                return selectedDate >= compareDate;
              },
              {
                message: `${field.name} must be on or after the reference date`,
              }
            );
          }
        }

        if (field.required)
          fieldSchema = fieldSchema.min(1, `${field.name} is required`);
        break;

      case "file":
        fieldSchema = z.any().optional();
        break;

      default:
        fieldSchema = z.string().optional();
    }

    if (!field.required && field.type !== "checkbox") {
      fieldSchema = fieldSchema.optional();
    }

    schemaObject[field.formFieldId] = fieldSchema;

    // Add conditional fields to schema
    if (field.conditionalFields) {
      field.conditionalFields.forEach((conditional) => {
        const condField = conditional.field;
        let condFieldSchema;

        switch (condField.type) {
          case "text":
            condFieldSchema = z.string();
            if (condField.required)
              condFieldSchema = condFieldSchema.min(
                1,
                `${condField.name} is required`
              );
            break;
          case "multiselect":
            condFieldSchema = z.array(z.string());
            if (condField.required)
              condFieldSchema = condFieldSchema.min(
                1,
                `At least one ${condField.name} is required`
              );
            break;
          default:
            condFieldSchema = z.string().optional();
        }

        schemaObject[condField.formFieldId] = condFieldSchema.optional();
      });
    }
  });

  return z.object(schemaObject);
};

// Field component renderer
const FieldRenderer = ({ field, control, watch, errors }) => {
  if (!field.enabled) return;
  const [showTooltip, setShowTooltip] = useState(false);

  const renderField = () => {
    switch (field.type) {
      case "text":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <input
                {...formField}
                type="text"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <textarea
                {...formField}
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        );

      case "number":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <input
                {...formField}
                type="number"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <select
                {...formField}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        );

      case "multiselect":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <div className="border border-gray-300 rounded-md p-2 max-h-32 overflow-y-auto">
                {field.options?.map((option) => (
                  <label
                    key={option.optionId}
                    className="flex items-center space-x-2 mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={
                        formField.value?.includes(option.optionId) || false
                      }
                      onChange={(e) => {
                        const currentValue = formField.value || [];
                        if (e.target.checked) {
                          formField.onChange([
                            ...currentValue,
                            option.optionId,
                          ]);
                        } else {
                          formField.onChange(
                            currentValue.filter((v) => v !== option.optionId)
                          );
                        }
                      }}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formField.value || false}
                  onChange={formField.onChange}
                />
                <span>Yes</span>
              </label>
            )}
          />
        );

      case "radio":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <div className="space-y-2">
                {field.options?.map((option) => (
                  <label
                    key={option.optionId}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      value={option.optionId}
                      checked={formField.value === option.optionId}
                      onChange={formField.onChange}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          />
        );

      case "date":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <input
                {...formField}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        );

      case "file":
        return (
          <Controller
            name={field.formFieldId}
            control={control}
            render={({ field: formField }) => (
              <input
                type="file"
                onChange={(e) => formField.onChange(e.target.files)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.name}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.tooltip?.status && (
          <div className="relative ml-2">
            <HelpCircle
              size={16}
              className="text-gray-400 cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute z-10 bg-gray-800 text-white text-xs rounded px-2 py-1 bottom-full left-0 mb-1 w-48">
                {field.tooltip.message}
              </div>
            )}
          </div>
        )}
      </div>
      {renderField()}
      {errors[field.formFieldId] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[field.formFieldId]?.message}
        </p>
      )}
    </div>
  );
};

// Main form component
const DynamicFormBuilder = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [activeForm, setActiveForm] = useState(0);
  const [expandedModules, setExpandedModules] = useState({});

  const currentModule = sampleSchema.modules[activeModule];
  const currentForm = currentModule?.forms[activeForm];

  // Generate Zod schema for current form
  const formSchema = currentForm
    ? generateZodSchema(currentForm.formFields)
    : z.object({});

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const watchedValues = watch();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  const toggleModule = (moduleIndex) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex],
    }));
  };

  const renderConditionalFields = (field) => {
    if (!field.conditionalFields) return null;

    const selectedValue = watchedValues[field.formFieldId];

    return field.conditionalFields.map((conditional) => {
      if (selectedValue === conditional.enableOnValue) {
        return (
          <div
            key={conditional.field.formFieldId}
            className="ml-4 mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <FieldRenderer
              field={conditional.field}
              control={control}
              watch={watch}
              errors={errors}
            />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Dynamic Form Builder
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar - Module/Form Navigation */}
        <div className="col-span-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Modules</h2>
          <div className="space-y-2">
            {sampleSchema.modules.map((module, moduleIndex) => (
              <div key={module.moduleId} className="border rounded-lg">
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-sm">{module.name}</span>
                  {expandedModules[moduleIndex] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {expandedModules[moduleIndex] && (
                  <div className="border-t">
                    {module.forms.map((form, formIndex) => (
                      <button
                        key={form.formId}
                        onClick={() => {
                          setActiveModule(moduleIndex);
                          setActiveForm(formIndex);
                          reset();
                        }}
                        className={`w-full p-3 text-left text-sm hover:bg-gray-50 ${
                          activeModule === moduleIndex &&
                          activeForm === formIndex
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                            : "text-gray-600"
                        }`}
                      >
                        {form.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Area */}
        <div className="col-span-9">
          {currentForm ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentForm.title}
                </h2>
                <p className="text-gray-600 mt-2">{currentForm.description}</p>
              </div>

              <div className="space-y-6">
                {currentForm.formFields
                  .sort((a, b) => a.order - b.order)
                  .map((field) => (
                    <div key={field.formFieldId}>
                      <FieldRenderer
                        field={field}
                        control={control}
                        watch={watch}
                        errors={errors}
                      />
                      {renderConditionalFields(field)}
                    </div>
                  ))}

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Form
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>Select a form from the sidebar to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicFormBuilder;
