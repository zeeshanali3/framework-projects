import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const GuidelineModal = ({ open, onClose, title, steps }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: '50%',
          transform: 'translateX(50%)',
          height: '100vh',
          width: '50%',
          maxWidth: '50vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
          '@media (max-width: 960px)': {
            width: '100%',
            maxWidth: '100%',
            left: 0,
            transform: 'none',
            borderRadius: 0,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div" fontWeight="bold">
            {title}
          </Typography>
        </Box>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-4 mx-auto flex flex-wrap">
            <div className="flex flex-wrap w-full">
              <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                {steps.map((step, index) => (
                  <div className="flex relative pb-12" key={index}>
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                      {step.icon}
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                        {step.title}
                      </h2>
                      <p className="leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                background: '#fff',
                marginTop: '20px',
                color: 'black',
                '&:hover': {
                  boxShadow: 3,
                  background: '#fff',
                },
              }}
            >
              Cancel
            </Button>
          </div>
        </section>
      </Box>
    </Modal>
  );
};

export default GuidelineModal;
