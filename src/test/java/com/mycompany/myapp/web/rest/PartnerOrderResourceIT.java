package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.PartnerOrder;
import com.mycompany.myapp.repository.PartnerOrderRepository;
import com.mycompany.myapp.service.PartnerOrderService;
import com.mycompany.myapp.service.dto.PartnerOrderDTO;
import com.mycompany.myapp.service.mapper.PartnerOrderMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PartnerOrderResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class PartnerOrderResourceIT {

    private static final String DEFAULT_SALES_ORDER_ID = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ORDER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ORDER_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_SERVICE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SERVICE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private PartnerOrderRepository partnerOrderRepository;

    @Autowired
    private PartnerOrderMapper partnerOrderMapper;

    @Autowired
    private PartnerOrderService partnerOrderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPartnerOrderMockMvc;

    private PartnerOrder partnerOrder;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartnerOrderResource partnerOrderResource = new PartnerOrderResource(partnerOrderService);
        this.restPartnerOrderMockMvc = MockMvcBuilders.standaloneSetup(partnerOrderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PartnerOrder createEntity(EntityManager em) {
        PartnerOrder partnerOrder = new PartnerOrder()
            .salesOrderId(DEFAULT_SALES_ORDER_ID)
            .orderDate(DEFAULT_ORDER_DATE)
            .serviceNumber(DEFAULT_SERVICE_NUMBER);
        return partnerOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PartnerOrder createUpdatedEntity(EntityManager em) {
        PartnerOrder partnerOrder = new PartnerOrder()
            .salesOrderId(UPDATED_SALES_ORDER_ID)
            .orderDate(UPDATED_ORDER_DATE)
            .serviceNumber(UPDATED_SERVICE_NUMBER);
        return partnerOrder;
    }

    @BeforeEach
    public void initTest() {
        partnerOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartnerOrder() throws Exception {
        int databaseSizeBeforeCreate = partnerOrderRepository.findAll().size();

        // Create the PartnerOrder
        PartnerOrderDTO partnerOrderDTO = partnerOrderMapper.toDto(partnerOrder);
        restPartnerOrderMockMvc.perform(post("/api/partner-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerOrderDTO)))
            .andExpect(status().isCreated());

        // Validate the PartnerOrder in the database
        List<PartnerOrder> partnerOrderList = partnerOrderRepository.findAll();
        assertThat(partnerOrderList).hasSize(databaseSizeBeforeCreate + 1);
        PartnerOrder testPartnerOrder = partnerOrderList.get(partnerOrderList.size() - 1);
        assertThat(testPartnerOrder.getSalesOrderId()).isEqualTo(DEFAULT_SALES_ORDER_ID);
        assertThat(testPartnerOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testPartnerOrder.getServiceNumber()).isEqualTo(DEFAULT_SERVICE_NUMBER);
    }

    @Test
    @Transactional
    public void createPartnerOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partnerOrderRepository.findAll().size();

        // Create the PartnerOrder with an existing ID
        partnerOrder.setId(1L);
        PartnerOrderDTO partnerOrderDTO = partnerOrderMapper.toDto(partnerOrder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartnerOrderMockMvc.perform(post("/api/partner-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PartnerOrder in the database
        List<PartnerOrder> partnerOrderList = partnerOrderRepository.findAll();
        assertThat(partnerOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPartnerOrders() throws Exception {
        // Initialize the database
        partnerOrderRepository.saveAndFlush(partnerOrder);

        // Get all the partnerOrderList
        restPartnerOrderMockMvc.perform(get("/api/partner-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partnerOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].salesOrderId").value(hasItem(DEFAULT_SALES_ORDER_ID)))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE)))
            .andExpect(jsonPath("$.[*].serviceNumber").value(hasItem(DEFAULT_SERVICE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getPartnerOrder() throws Exception {
        // Initialize the database
        partnerOrderRepository.saveAndFlush(partnerOrder);

        // Get the partnerOrder
        restPartnerOrderMockMvc.perform(get("/api/partner-orders/{id}", partnerOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partnerOrder.getId().intValue()))
            .andExpect(jsonPath("$.salesOrderId").value(DEFAULT_SALES_ORDER_ID))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE))
            .andExpect(jsonPath("$.serviceNumber").value(DEFAULT_SERVICE_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingPartnerOrder() throws Exception {
        // Get the partnerOrder
        restPartnerOrderMockMvc.perform(get("/api/partner-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartnerOrder() throws Exception {
        // Initialize the database
        partnerOrderRepository.saveAndFlush(partnerOrder);

        int databaseSizeBeforeUpdate = partnerOrderRepository.findAll().size();

        // Update the partnerOrder
        PartnerOrder updatedPartnerOrder = partnerOrderRepository.findById(partnerOrder.getId()).get();
        // Disconnect from session so that the updates on updatedPartnerOrder are not directly saved in db
        em.detach(updatedPartnerOrder);
        updatedPartnerOrder
            .salesOrderId(UPDATED_SALES_ORDER_ID)
            .orderDate(UPDATED_ORDER_DATE)
            .serviceNumber(UPDATED_SERVICE_NUMBER);
        PartnerOrderDTO partnerOrderDTO = partnerOrderMapper.toDto(updatedPartnerOrder);

        restPartnerOrderMockMvc.perform(put("/api/partner-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerOrderDTO)))
            .andExpect(status().isOk());

        // Validate the PartnerOrder in the database
        List<PartnerOrder> partnerOrderList = partnerOrderRepository.findAll();
        assertThat(partnerOrderList).hasSize(databaseSizeBeforeUpdate);
        PartnerOrder testPartnerOrder = partnerOrderList.get(partnerOrderList.size() - 1);
        assertThat(testPartnerOrder.getSalesOrderId()).isEqualTo(UPDATED_SALES_ORDER_ID);
        assertThat(testPartnerOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testPartnerOrder.getServiceNumber()).isEqualTo(UPDATED_SERVICE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingPartnerOrder() throws Exception {
        int databaseSizeBeforeUpdate = partnerOrderRepository.findAll().size();

        // Create the PartnerOrder
        PartnerOrderDTO partnerOrderDTO = partnerOrderMapper.toDto(partnerOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartnerOrderMockMvc.perform(put("/api/partner-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partnerOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PartnerOrder in the database
        List<PartnerOrder> partnerOrderList = partnerOrderRepository.findAll();
        assertThat(partnerOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePartnerOrder() throws Exception {
        // Initialize the database
        partnerOrderRepository.saveAndFlush(partnerOrder);

        int databaseSizeBeforeDelete = partnerOrderRepository.findAll().size();

        // Delete the partnerOrder
        restPartnerOrderMockMvc.perform(delete("/api/partner-orders/{id}", partnerOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PartnerOrder> partnerOrderList = partnerOrderRepository.findAll();
        assertThat(partnerOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
