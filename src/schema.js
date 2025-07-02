export const SCHEMA = {
  "versionid": "11111111-1111-1111-1111-111111111111",
  "modules": [
    {
      "moduleId": "22222222-2222-2222-2222-222222222222",
      "name": "Compliance Module",
      "order": 0,
      "enabled": true,
      "forms": [
        {
          "formId": "33333333-3333-3333-3333-333333333333",
          "title": "Incident Form",
          "description": "Form to report incidents",
          "order": 0,
          "enabled": true,
          "formFields": [
            {
              "formFieldId": "44444444-4444-4444-4444-444444444444",
              "name": "Description",
              "type": "textarea",
              "required": true,
              "enabled": true,
              "order": 0,
              "tooltip": {
                "status": true,
                "message": "Provide a brief description of the incident"
              }
            }
          ]
        }
      ]
    }
  ],
  "organizationalHierarchy": [
    {
      "nodeId": "55555555-5555-5555-5555-555555555555",
      "name": "Corporate",
      "parentId": null,
      "order": 0
    },
    {
      "nodeId": "66666666-6666-6666-6666-666666666666",
      "name": "HR",
      "parentId": "55555555-5555-5555-5555-555555555555",
      "order": 1
    }
  ],
  "riskType": [
    {
      "riskTypeId": "66666666-6666-6666-6666-666666666666",
      "name": "Operational Risk",
      "enabled": true,
      "order": 0,
      "defaultMilestones": {
        "status": true,
        "milestones": [
          {
            "milestoneId": "77777777-7777-7777-7777-777777777777",
            "name": "Initial Assessment",
            "order": 0,
            "enabled": true
          }
        ]
      },
      "autoClassify": {
        "status": false
      }
    }
  ]
}