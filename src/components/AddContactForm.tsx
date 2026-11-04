
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { redirect } from 'next/navigation';
import { addContact } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddContactSchema } from '@/lib/validationSchemas';

// added the form for making new contacts
const AddContactForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InferType<typeof AddContactSchema>>({
    resolver: yupResolver(AddContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      image: '',
      description: '',
      owner: '',
    },
  });

  // keep the owner field matched to the signed in user
  useEffect(() => {
    setValue('owner', currentUser);
  }, [currentUser, setValue]);

  // save the new contact using the form information
  const onSubmit = async (data: InferType<typeof AddContactSchema>) => {
    await addContact({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      image: data.image,
      description: data.description,
      owner: currentUser,
    });
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* first row has the first and last name */}
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <input
                        type="text"
                        {...register('firstName')}
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">
                        {errors.firstName?.message}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <input
                        type="text"
                        {...register('lastName')}
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">
                        {errors.lastName?.message}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* second row has the address and image */}
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <input
                        type="text"
                        {...register('address')}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">
                        {errors.address?.message}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <input
                        type="text"
                        {...register('image')}
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">
                        {errors.image?.message}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* description gets its own bigger text box */}
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    rows={2}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.description?.message}
                  </div>
                </Form.Group>

                <input type="hidden" {...register('owner')} />

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        onClick={() => reset()}
                        variant="warning"
                        className="float-right"
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContactForm;
