
'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Contact } from '@prisma/client';
import { InferType } from 'yup';
import { EditContactSchema } from '@/lib/validationSchemas';
import { editContact } from '@/lib/dbActions';

// added this form to edit existing contacts
const EditContactForm = ({ contact }: { contact: Contact }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InferType<typeof EditContactSchema>>({
    resolver: yupResolver(EditContactSchema),
    defaultValues: {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });

  // save whatever changes were made to the contact
  const onSubmit = async (data: InferType<typeof EditContactSchema>) => {
    await editContact({
      id: contact.id,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      image: data.image,
      description: data.description,
      owner: contact.owner,
    });
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* keep the id and owner for this contact */}
                <input
                  type="hidden"
                  {...register('id', { valueAsNumber: true })}
                />
                <input type="hidden" {...register('owner')} />

                {/* show the saved first and last name */}
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

                {/* show the saved address and image */}
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

                {/* show the saved description so it can be changed */}
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

export default EditContactForm;
