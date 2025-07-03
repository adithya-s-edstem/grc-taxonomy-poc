import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemaFull } from "./schemaFull";

// TODO: Import your full schema here
const SAMPLE_SCHEMA = {
  // Your full schema object goes here - truncated for brevity
  modules: [], // Full modules array
  organizationalHierarchy: [], // Full org hierarchy
  riskType: [], // Full risk types
};

// TODO: Create comprehensive Zod schemas based on your field types
const createFieldSchema = (field) => {
  let schema;

  switch (field.type) {
    case "text":
    case "textarea":
      schema = z.string();
      break;
    case "number":
      schema = z.number();
      break;
    case "select":
    case "radio":
      schema = z.string();
      break;
    case "multiselect":
      schema = z.array(z.string());
      break;
    case "checkbox":
      schema = z.boolean();
      break;
    case "date":
      schema = z.string(); // TODO: Add date validations from dateValidations
      break;
    case "file":
      schema = z.any(); // TODO: Handle file validation
      break;
    case "nodeselect":
      schema = z.string();
      break;
    case "radiogroup":
      schema = z.object({
        main: z.string(),
        sub: z.string(),
      });
      break;
    default:
      schema = z.string();
  }

  return field.required ? schema : schema.optional();
};

// Field Components
const TextFieldComponent = ({ field, control, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">
      {field.name} {field.required && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={field.formFieldId}
      control={control}
      render={({ field: formField }) => (
        <input
          {...formField}
          type={field.type === "number" ? "number" : "text"}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    />
    {/* TODO: Add tooltip rendering if field.tooltip.status */}
    {errors[field.formFieldId] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[field.formFieldId]?.message}
      </p>
    )}
  </div>
);

const TextAreaComponent = ({ field, control, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">
      {field.name} {field.required && <span className="text-red-500">*</span>}
    </label>
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
    {errors[field.formFieldId] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[field.formFieldId]?.message}
      </p>
    )}
  </div>
);

const SelectComponent = ({ field, control, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">
      {field.name} {field.required && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={field.formFieldId}
      control={control}
      render={({ field: formField }) => (
        <select
          {...formField}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option.optionId} value={option.optionId}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
    {errors[field.formFieldId] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[field.formFieldId]?.message}
      </p>
    )}
  </div>
);

const MultiSelectComponent = ({ field, control, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">
      {field.name} {field.required && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={field.formFieldId}
      control={control}
      render={({ field: formField }) => (
        <div className="space-y-2">
          {field.options?.map((option) => (
            <label key={option.optionId} className="flex items-center">
              <input
                type="checkbox"
                value={option.optionId}
                checked={formField.value?.includes(option.optionId) || false}
                onChange={(e) => {
                  const value = formField.value || [];
                  if (e.target.checked) {
                    formField.onChange([...value, option.optionId]);
                  } else {
                    formField.onChange(
                      value.filter((v) => v !== option.optionId)
                    );
                  }
                }}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    />
    {errors[field.formFieldId] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[field.formFieldId]?.message}
      </p>
    )}
  </div>
);

const RadioComponent = ({ field, control, errors }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">
      {field.name} {field.required && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={field.formFieldId}
      control={control}
      render={({ field: formField }) => (
        <div className="space-y-2">
          {field.options?.map((option) => (
            <label key={option.optionId} className="flex items-center">
              <input
                type="radio"
                value={option.optionId}
                checked={formField.value === option.optionId}
                onChange={() => formField.onChange(option.optionId)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    />
    {errors[field.formFieldId] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[field.formFieldId]?.message}
      </p>
    )}
  </div>
);

const RadioGroupComponent = ({ field, control, errors, watch }) => {
  const mainValue = watch(field.formFieldId + ".main");
  const subOptions =
    field.subOptions?.forEach?.find((item) => item.forOptionId === mainValue)
      ?.options || [];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {field.name} {field.required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={field.formFieldId + ".main"}
        control={control}
        render={({ field: formField }) => (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.optionId} className="flex items-center">
                <input
                  type="radio"
                  value={option.optionId}
                  checked={formField.value === option.optionId}
                  onChange={() => formField.onChange(option.optionId)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      />

      {/* Sub-options */}
      {subOptions.length > 0 && (
        <div className="mt-4 ml-6">
          <label className="block text-sm font-medium mb-1">
            {field.subOptions.name}
          </label>
          <Controller
            name={field.formFieldId + ".sub"}
            control={control}
            render={({ field: formField }) => (
              <select
                {...formField}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                {subOptions.map((option) => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      )}

      {errors[field.formFieldId] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[field.formFieldId]?.message}
        </p>
      )}
    </div>
  );
};

// TODO: Add more field components (CheckboxComponent, DateComponent, FileComponent, NodeSelectComponent)

const FieldRenderer = ({ field, control, errors, watch }) => {
  switch (field.type) {
    case "text":
    case "number":
      return (
        <TextFieldComponent field={field} control={control} errors={errors} />
      );
    case "textarea":
      return (
        <TextAreaComponent field={field} control={control} errors={errors} />
      );
    case "select":
      return (
        <SelectComponent field={field} control={control} errors={errors} />
      );
    case "multiselect":
      return (
        <MultiSelectComponent field={field} control={control} errors={errors} />
      );
    case "radio":
      return <RadioComponent field={field} control={control} errors={errors} />;
    case "radiogroup":
      return (
        <RadioGroupComponent
          field={field}
          control={control}
          errors={errors}
          watch={watch}
        />
      );
    // TODO: Add cases for checkbox, date, file, nodeselect
    default:
      return <div>Unsupported field type: {field.type}</div>;
  }
};

const ConditionalFields = ({ field, control, errors, watch }) => {
  const watchValue = watch(field.formFieldId);
  const conditionalField = field.conditionalFields?.find(
    (cf) => cf.enableOnValue === watchValue
  );

  if (!conditionalField) return null;

  return (
    <div className="ml-6 border-l-2 border-gray-200 pl-4">
      <FieldRenderer
        field={conditionalField.field}
        control={control}
        errors={errors}
        watch={watch}
      />
    </div>
  );
};

const FormRenderer = ({ form }) => {
  // TODO: Generate dynamic schema from form.formFields
  const formSchema = z.object({
    // Dynamic schema generation based on formFields
  });

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

  const sortedFields = form.formFields?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium">{form.title}</h3>
        {form.description && (
          <p className="text-sm text-gray-600 mt-1">{form.description}</p>
        )}
      </div>

      {sortedFields.map((field) => (
        <div key={field.formFieldId}>
          <FieldRenderer
            field={field}
            control={control}
            errors={errors}
            watch={watch}
          />
          <ConditionalFields
            field={field}
            control={control}
            errors={errors}
            watch={watch}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  );
};

const ModulesTab = ({ modules }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  const sortedModules = modules?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Module List */}
      <div className="col-span-3">
        <h3 className="font-medium mb-4">Modules</h3>
        <div className="space-y-2">
          {sortedModules.map((module) => (
            <button
              key={module.moduleId}
              onClick={() => {
                setSelectedModule(module);
                setSelectedForm(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-md ${
                selectedModule?.moduleId === module.moduleId
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {module.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form List */}
      <div className="col-span-3">
        <h3 className="font-medium mb-4">Forms</h3>
        {selectedModule && (
          <div className="space-y-2">
            {selectedModule.forms
              ?.sort((a, b) => a.order - b.order)
              .map((form) => (
                <button
                  key={form.formId}
                  onClick={() => setSelectedForm(form)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    selectedForm?.formId === form.formId
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {form.title}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="col-span-6">
        {selectedForm ? (
          <FormRenderer form={selectedForm} />
        ) : (
          <div className="text-gray-500 text-center py-8">
            Select a module and form to view fields
          </div>
        )}
      </div>
    </div>
  );
};

const OrganizationalHierarchyTab = ({ hierarchy }) => {
  // TODO: Implement tree view of organizational hierarchy
  return (
    <div>
      <h3 className="font-medium mb-4">Organizational Hierarchy</h3>
      <div className="space-y-2">
        {hierarchy?.map((node) => (
          <div key={node.nodeId} className="border p-3 rounded-md">
            <h4 className="font-medium">{node.name}</h4>
            <p className="text-sm text-gray-600">
              Parent: {node.parentId || "Root"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RiskTypesTab = ({ riskTypes }) => {
  return (
    <div>
      <h3 className="font-medium mb-4">Risk Types</h3>
      <div className="space-y-4">
        {riskTypes
          ?.sort((a, b) => a.order - b.order)
          .map((riskType) => (
            <div key={riskType.riskTypeId} className="border p-4 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{riskType.name}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    riskType.enabled
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {riskType.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>

              {/* TODO: Render defaultMilestones and autoClassify settings */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default function DynamicFormSchema() {
  const [activeTab, setActiveTab] = useState("modules");

  // TODO: Replace with your actual schema
  const schema = schemaFull;

  const tabs = [
    { id: "modules", label: "Modules" },
    { id: "hierarchy", label: "Organizational Hierarchy" },
    { id: "risktypes", label: "Risk Types" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dynamic Form Schema</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "modules" && <ModulesTab modules={schema.modules} />}
        {activeTab === "hierarchy" && (
          <OrganizationalHierarchyTab
            hierarchy={schema.organizationalHierarchy}
          />
        )}
        {activeTab === "risktypes" && (
          <RiskTypesTab riskTypes={schema.riskType} />
        )}
      </div>
    </div>
  );
}
