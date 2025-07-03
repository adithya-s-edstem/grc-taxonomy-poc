export const schemaFull = {
  "versionid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "modules": [
    {
      "moduleId": "module-001-uuid-1234-5678-90abcdef1234",
      "name": "Risk Management Module",
      "order": 0,
      "enabled": true,
      "forms": [
        {
          "formId": "form-001-uuid-1234-5678-90abcdef1234",
          "title": "Comprehensive Risk Assessment Form",
          "description": "Complete form demonstrating all field types and conditional logic",
          "order": 0,
          "enabled": true,
          "formFields": [
            // Text field
            {
              "formFieldId": "field-text-uuid-1234-5678-90abcdef1234",
              "name": "Risk Title",
              "placeholder": "Enter a descriptive title for the risk",
              "type": "text",
              "required": true,
              "enabled": true,
              "order": 0,
              "tooltip": {
                "status": true,
                "message": "Provide a clear, concise title that identifies the risk"
              }
            },
            // Textarea field
            {
              "formFieldId": "field-textarea-uuid-1234-5678-90abcdef1234",
              "name": "Risk Description",
              "placeholder": "Detailed description of the risk scenario...",
              "type": "textarea",
              "required": true,
              "enabled": true,
              "order": 1,
              "tooltip": {
                "status": true,
                "message": "Describe the risk in detail, including potential causes and impacts"
              }
            },
            // Number field
            {
              "formFieldId": "field-number-uuid-1234-5678-90abcdef1234",
              "name": "Financial Impact (USD)",
              "placeholder": "0",
              "type": "number",
              "required": true,
              "enabled": true,
              "order": 2,
              "tooltip": {
                "status": true,
                "message": "Estimated financial impact in US Dollars"
              }
            },
            // Select field with conditional fields
            {
              "formFieldId": "field-select-uuid-1234-5678-90abcdef1234",
              "name": "Risk Category",
              "type": "select",
              "required": true,
              "enabled": true,
              "order": 3,
              "options": [
                {
                  "optionId": "option-operational-uuid-1234-5678-90abcdef1234",
                  "label": "Operational Risk"
                },
                {
                  "optionId": "option-financial-uuid-1234-5678-90abcdef1234",
                  "label": "Financial Risk"
                },
                {
                  "optionId": "option-strategic-uuid-1234-5678-90abcdef1234",
                  "label": "Strategic Risk"
                },
                {
                  "optionId": "option-compliance-uuid-1234-5678-90abcdef1234",
                  "label": "Compliance Risk"
                }
              ],
              "tooltip": {
                "status": true,
                "message": "Select the primary category that best describes this risk"
              },
              "conditionalFields": [
                {
                  "enableOnValue": "option-operational-uuid-1234-5678-90abcdef1234",
                  "field": {
                    "formFieldId": "conditional-operational-uuid-1234-5678-90abcdef1234",
                    "name": "Operational Process Affected",
                    "placeholder": "Which operational process is impacted?",
                    "type": "text",
                    "required": true,
                    "enabled": true,
                    "order": 4,
                    "tooltip": {
                      "status": true,
                      "message": "Specify the operational process that would be affected by this risk"
                    }
                  }
                },
                {
                  "enableOnValue": "option-financial-uuid-1234-5678-90abcdef1234",
                  "field": {
                    "formFieldId": "conditional-financial-uuid-1234-5678-90abcdef1234",
                    "name": "Financial Statement Impact",
                    "type": "multiselect",
                    "required": true,
                    "enabled": true,
                    "order": 4,
                    "options": [
                      {
                        "optionId": "fs-revenue-uuid-1234-5678-90abcdef1234",
                        "label": "Revenue"
                      },
                      {
                        "optionId": "fs-expenses-uuid-1234-5678-90abcdef1234",
                        "label": "Expenses"
                      },
                      {
                        "optionId": "fs-assets-uuid-1234-5678-90abcdef1234",
                        "label": "Assets"
                      },
                      {
                        "optionId": "fs-liabilities-uuid-1234-5678-90abcdef1234",
                        "label": "Liabilities"
                      }
                    ],
                    "tooltip": {
                      "status": true,
                      "message": "Select all financial statement areas that could be impacted"
                    }
                  }
                }
              ]
            },
            // Multiselect field
            {
              "formFieldId": "field-multiselect-uuid-1234-5678-90abcdef1234",
              "name": "Affected Departments",
              "type": "multiselect",
              "required": true,
              "enabled": true,
              "order": 5,
              "options": [
                {
                  "optionId": "dept-finance-uuid-1234-5678-90abcdef1234",
                  "label": "Finance"
                },
                {
                  "optionId": "dept-hr-uuid-1234-5678-90abcdef1234",
                  "label": "Human Resources"
                },
                {
                  "optionId": "dept-it-uuid-1234-5678-90abcdef1234",
                  "label": "Information Technology"
                },
                {
                  "optionId": "dept-ops-uuid-1234-5678-90abcdef1234",
                  "label": "Operations"
                },
                {
                  "optionId": "dept-legal-uuid-1234-5678-90abcdef1234",
                  "label": "Legal & Compliance"
                }
              ],
              "tooltip": {
                "status": true,
                "message": "Select all departments that would be affected by this risk"
              }
            },
            // Checkbox field
            {
              "formFieldId": "field-checkbox-uuid-1234-5678-90abcdef1234",
              "name": "Regulatory Implications",
              "type": "checkbox",
              "required": false,
              "enabled": true,
              "order": 6,
              "tooltip": {
                "status": true,
                "message": "Check if this risk has regulatory or compliance implications"
              }
            },
            // Radio field
            {
              "formFieldId": "field-radio-uuid-1234-5678-90abcdef1234",
              "name": "Risk Priority",
              "type": "radio",
              "required": true,
              "enabled": true,
              "order": 7,
              "options": [
                {
                  "optionId": "priority-low-uuid-1234-5678-90abcdef1234",
                  "label": "Low"
                },
                {
                  "optionId": "priority-medium-uuid-1234-5678-90abcdef1234",
                  "label": "Medium"
                },
                {
                  "optionId": "priority-high-uuid-1234-5678-90abcdef1234",
                  "label": "High"
                },
                {
                  "optionId": "priority-critical-uuid-1234-5678-90abcdef1234",
                  "label": "Critical"
                }
              ],
              "tooltip": {
                "status": true,
                "message": "Select the priority level for addressing this risk"
              }
            },
            // Radiogroup field with subOptions
            {
              "formFieldId": "field-radiogroup-uuid-1234-5678-90abcdef1234",
              "name": "Risk Assessment Method",
              "type": "radiogroup",
              "required": true,
              "enabled": true,
              "order": 8,
              "options": [
                {
                  "optionId": "method-qualitative-uuid-1234-5678-90abcdef1234",
                  "label": "Qualitative Assessment"
                },
                {
                  "optionId": "method-quantitative-uuid-1234-5678-90abcdef1234",
                  "label": "Quantitative Assessment"
                },
                {
                  "optionId": "method-hybrid-uuid-1234-5678-90abcdef1234",
                  "label": "Hybrid Approach"
                }
              ],
              "tooltip": {
                "status": true,
                "message": "Choose the assessment methodology for this risk"
              },
              "subOptions": {
                "formFieldId": "suboption-assessment-uuid-1234-5678-90abcdef1234",
                "name": "Assessment Tool",
                "placeholder": "Select the specific tool or framework",
                "required": true,
                "tooltip": {
                  "status": true,
                  "message": "Choose the specific assessment tool for the selected method"
                },
                "forEach": [
                  {
                    "forOptionId": "method-qualitative-uuid-1234-5678-90abcdef1234",
                    "options": [
                      {
                        "optionId": "qual-expert-uuid-1234-5678-90abcdef1234",
                        "label": "Expert Judgment"
                      },
                      {
                        "optionId": "qual-delphi-uuid-1234-5678-90abcdef1234",
                        "label": "Delphi Method"
                      },
                      {
                        "optionId": "qual-scenario-uuid-1234-5678-90abcdef1234",
                        "label": "Scenario Analysis"
                      }
                    ]
                  },
                  {
                    "forOptionId": "method-quantitative-uuid-1234-5678-90abcdef1234",
                    "options": [
                      {
                        "optionId": "quant-montecarlo-uuid-1234-5678-90abcdef1234",
                        "label": "Monte Carlo Simulation"
                      },
                      {
                        "optionId": "quant-var-uuid-1234-5678-90abcdef1234",
                        "label": "Value at Risk (VaR)"
                      },
                      {
                        "optionId": "quant-sensitivity-uuid-1234-5678-90abcdef1234",
                        "label": "Sensitivity Analysis"
                      }
                    ]
                  },
                  {
                    "forOptionId": "method-hybrid-uuid-1234-5678-90abcdef1234",
                    "options": [
                      {
                        "optionId": "hybrid-scorecard-uuid-1234-5678-90abcdef1234",
                        "label": "Risk Scorecard"
                      },
                      {
                        "optionId": "hybrid-matrix-uuid-1234-5678-90abcdef1234",
                        "label": "Risk Matrix"
                      },
                      {
                        "optionId": "hybrid-dashboard-uuid-1234-5678-90abcdef1234",
                        "label": "Risk Dashboard"
                      }
                    ]
                  }
                ]
              }
            },
            // File field
            {
              "formFieldId": "field-file-uuid-1234-5678-90abcdef1234",
              "name": "Supporting Documentation",
              "type": "file",
              "required": false,
              "enabled": true,
              "order": 9,
              "tooltip": {
                "status": true,
                "message": "Upload any supporting documents, reports, or evidence related to this risk"
              }
            },
            // Date field with validations
            {
              "formFieldId": "field-date-uuid-1234-5678-90abcdef1234",
              "name": "Risk Identification Date",
              "type": "date",
              "required": true,
              "enabled": true,
              "order": 10,
              "tooltip": {
                "status": true,
                "message": "Date when this risk was first identified"
              },
              "dateValidations": {
                "allowFutureDates": false,
                "allowPastDates": true
              }
            },
            // Another date field for comparison
            {
              "formFieldId": "field-date-target-uuid-1234-5678-90abcdef1234",
              "name": "Target Resolution Date",
              "type": "date",
              "required": true,
              "enabled": true,
              "order": 11,
              "tooltip": {
                "status": true,
                "message": "Target date for risk resolution or mitigation"
              },
              "dateValidations": {
                "allowFutureDates": true,
                "allowPastDates": false,
                "greaterOrEqualTo": "field-date-uuid-1234-5678-90abcdef1234"
              }
            },
            // NodeSelect field
            {
              "formFieldId": "field-nodeselect-uuid-1234-5678-90abcdef1234",
              "name": "Responsible Organization Unit",
              "type": "nodeselect",
              "required": true,
              "enabled": true,
              "order": 12,
              "tooltip": {
                "status": true,
                "message": "Select the organizational unit responsible for managing this risk"
              }
            }
          ]
        }
      ]
    },
    // Second module for additional testing
    {
      "moduleId": "module-002-uuid-1234-5678-90abcdef1234",
      "name": "Compliance Monitoring Module",
      "order": 1,
      "enabled": true,
      "forms": [
        {
          "formId": "form-002-uuid-1234-5678-90abcdef1234",
          "title": "Compliance Audit Form",
          "description": "Form for documenting compliance audit findings",
          "order": 0,
          "enabled": true,
          "formFields": [
            {
              "formFieldId": "field-audit-title-uuid-1234-5678-90abcdef1234",
              "name": "Audit Title",
              "type": "text",
              "required": true,
              "enabled": true,
              "order": 0,
              "tooltip": {
                "status": false
              }
            }
          ]
        }
      ]
    }
  ],
  "organizationalHierarchy": [
    {
      "nodeId": "org-root-uuid-1234-5678-90abcdef1234",
      "name": "Global Headquarters",
      "parentId": null,
      "order": 0
    },
    {
      "nodeId": "org-americas-uuid-1234-5678-90abcdef1234",
      "name": "Americas Division",
      "parentId": "org-root-uuid-1234-5678-90abcdef1234",
      "order": 1
    },
    {
      "nodeId": "org-emea-uuid-1234-5678-90abcdef1234",
      "name": "EMEA Division",
      "parentId": "org-root-uuid-1234-5678-90abcdef1234",
      "order": 2
    },
    {
      "nodeId": "org-apac-uuid-1234-5678-90abcdef1234",
      "name": "APAC Division",
      "parentId": "org-root-uuid-1234-5678-90abcdef1234",
      "order": 3
    },
    {
      "nodeId": "org-us-finance-uuid-1234-5678-90abcdef1234",
      "name": "US Finance Department",
      "parentId": "org-americas-uuid-1234-5678-90abcdef1234",
      "order": 4
    },
    {
      "nodeId": "org-us-hr-uuid-1234-5678-90abcdef1234",
      "name": "US Human Resources",
      "parentId": "org-americas-uuid-1234-5678-90abcdef1234",
      "order": 5
    },
    {
      "nodeId": "org-uk-compliance-uuid-1234-5678-90abcdef1234",
      "name": "UK Compliance Office",
      "parentId": "org-emea-uuid-1234-5678-90abcdef1234",
      "order": 6
    }
  ],
  "riskType": [
    {
      "riskTypeId": "risktype-operational-uuid-1234-5678-90abcdef1234",
      "name": "Operational Risk",
      "enabled": true,
      "order": 0,
      "defaultMilestones": {
        "status": true,
        "milestones": [
          {
            "milestoneId": "milestone-identification-uuid-1234-5678-90abcdef1234",
            "name": "Risk Identification",
            "order": 0,
            "enabled": true
          },
          {
            "milestoneId": "milestone-assessment-uuid-1234-5678-90abcdef1234",
            "name": "Risk Assessment",
            "order": 1,
            "enabled": true
          },
          {
            "milestoneId": "milestone-mitigation-uuid-1234-5678-90abcdef1234",
            "name": "Mitigation Planning",
            "order": 2,
            "enabled": true
          },
          {
            "milestoneId": "milestone-monitoring-uuid-1234-5678-90abcdef1234",
            "name": "Ongoing Monitoring",
            "order": 3,
            "enabled": true
          }
        ]
      },
      "autoClassify": {
        "status": true,
        "classifyOn": {
          "moduleId": "module-001-uuid-1234-5678-90abcdef1234",
          "formId": "form-001-uuid-1234-5678-90abcdef1234",
          "formFieldId": "field-number-uuid-1234-5678-90abcdef1234",
          "greaterThan": 100000
        }
      }
    },
    {
      "riskTypeId": "risktype-financial-uuid-1234-5678-90abcdef1234",
      "name": "Financial Risk",
      "enabled": true,
      "order": 1,
      "defaultMilestones": {
        "status": false
      },
      "autoClassify": {
        "status": false
      }
    },
    {
      "riskTypeId": "risktype-strategic-uuid-1234-5678-90abcdef1234",
      "name": "Strategic Risk",
      "enabled": true,
      "order": 2,
      "defaultMilestones": {
        "status": true,
        "milestones": [
          {
            "milestoneId": "milestone-strategic-analysis-uuid-1234-5678-90abcdef1234",
            "name": "Strategic Analysis",
            "order": 0,
            "enabled": true
          },
          {
            "milestoneId": "milestone-board-review-uuid-1234-5678-90abcdef1234",
            "name": "Board Review",
            "order": 1,
            "enabled": false
          }
        ]
      },
      "autoClassify": {
        "status": true,
        "classifyOn": {
          "moduleId": "module-001-uuid-1234-5678-90abcdef1234",
          "formId": "form-001-uuid-1234-5678-90abcdef1234",
          "formFieldId": "field-number-uuid-1234-5678-90abcdef1234",
          "greaterThan": 1000000
        }
      }
    },
    {
      "riskTypeId": "risktype-compliance-uuid-1234-5678-90abcdef1234",
      "name": "Compliance Risk",
      "enabled": false,
      "order": 3,
      "defaultMilestones": {
        "status": false
      },
      "autoClassify": {
        "status": false
      }
    }
  ]
}