#!/bin/bash
cd /home/kavia/workspace/code-generation/simplifylearn-179157-179167/explainlike5_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

